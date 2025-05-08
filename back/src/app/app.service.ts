import { randomBytes, randomUUID } from "crypto"
import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	BadRequestException,
	ForbiddenException,
	UnauthorizedException,
} from "@/lib/HttpException"
import bcrypt from "bcrypt"
import capitalize from "@/lib/capitalize"
import redisService from "@/redis/redis.service"
import mailerService from "@/mailer/mailer.service"
import s3Service from "@/s3/s3.service"

class appService {
	private repository
	private s3Service
	private redisService
	private mailerService

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
		this.s3Service = new s3Service(app, options)
		this.redisService = new redisService(app, options)
		this.mailerService = new mailerService(app, options)
	}

	/* ============= PUBLIC CONTROLLER ============= */

	async login(
		username: UserData["username"],
		password: string,
	): Promise<{
		sessionId: NonNullable<UserData["sessionId"]>
		isCompleting?: boolean
	}> {
		const user = await this.repository.getUserByUsername(username)

		if (!user) throw new ForbiddenException()

		if (!(await bcrypt.compare(password, user.password)))
			throw new ForbiddenException()

		if (user.sessionId) await this.redisService.deleteAllSession(user.sessionId)

		const sessionId = randomUUID()
		try {
			if (user.completed)
				await this.redisService.createSession(user.id, sessionId)
			else await this.redisService.createCompletingSession(user.id, sessionId)
			await this.repository.updateUserSessionId(user.id, sessionId)

			return {
				sessionId,
				isCompleting: !user.completed,
			}
		} catch (error) {
			await this.redisService.deleteAllSession(user.sessionId)

			throw error
		}
	}

	async register(
		userData: Pick<
			UserData,
			"email" | "firstName" | "lastName" | "username" | "password"
		>,
	) {
		if (await this.repository.getUserByEmail(userData.email))
			throw new ForbiddenException("EMAIL_ALREADY_TAKEN")

		if (await this.repository.getUserByUsername(userData.username))
			throw new ForbiddenException("USERNAME_ALREADY_TAKEN")

		const token = this.getRandomToken()
		let userId: UserData["id"] = ""

		try {
			userId = await this.repository.createUser(userData)

			await this.redisService.createActivationToken(userId, token)
			await this.mailerService.sendActivationEmail(
				userData.email,
				userData.firstName,
				token,
			)
		} catch (error) {
			if (userId) await this.repository.deleteUser(userId)
			await this.redisService.deleteActivationToken(token)
			throw error
		}
	}

	async forgot(email: UserData["email"]) {
		const user = await this.repository.getUserByEmail(email)

		if (!user) return

		const token = this.getRandomToken()
		try {
			await this.redisService.createResetPasswordToken(user.id, token)
			await this.mailerService.sendResetPasswordEmail(email, token)
		} catch (error) {
			await this.redisService.deleteResetPasswordToken(token)
			throw error
		}
	}

	async verify(
		sessionId?: UserData["sessionId"],
		completingSessionId?: UserData["sessionId"],
		resetingSessionId?: UserData["sessionId"],
	): Promise<{
		userId: UserData["id"]
		user?: UserData
		isAuthenticated?: boolean
		isCompleting?: boolean
		isReseting?: boolean
	}> {
		if (sessionId) {
			const userId = await this.redisService.getSession(sessionId)

			if (!userId) throw new UnauthorizedException()

			const user = await this.getUser(userId)

			return {
				userId,
				user,
				isAuthenticated: true,
			}
		} else if (completingSessionId) {
			const userId =
				await this.redisService.getCompletingSession(completingSessionId)

			if (!userId || (await this.repository.isUserCompletedQuery(userId)))
				throw new UnauthorizedException()

			return {
				userId,
				isCompleting: true,
			}
		} else if (resetingSessionId) {
			const userId =
				await this.redisService.getResetingSession(resetingSessionId)

			if (!userId) throw new UnauthorizedException()

			return {
				userId,
				isReseting: true,
			}
		}

		throw new UnauthorizedException()
	}

	async activate(token: string) {
		const userId = await this.redisService.getActivationToken(token)

		if (!userId) throw new BadRequestException()

		const sessionId = await this.redisService.createCompletingSession(userId)

		await this.repository.activateUser(userId, sessionId)
		await this.redisService.deleteActivationToken(token)

		return sessionId
	}

	async reset(token: string) {
		const userId = await this.redisService.getResetPasswordToken(token)

		if (!userId) throw new BadRequestException()

		const sessionId = await this.redisService.createResetingSession(userId)

		await this.repository.activateUser(userId, sessionId)
		await this.redisService.deleteResetPasswordToken(token)

		return sessionId
	}

	async resetPassword(
		sessionId: UserData["sessionId"],
		newPassword: UserData["password"],
	) {
		const userId = await this.redisService.getResetingSession(sessionId)

		if (!userId) throw new UnauthorizedException()

		await this.repository.updateUserPassword(userId, newPassword)
		await this.redisService.deleteResetingSession(sessionId)
	}

	/* ============= PRIVATE CONTROLLER ============= */

	async complete(
		userData: Pick<
			UserData,
			"id" | "sessionId" | "birthDate" | "gender" | "sexualOrientation" | "bio"
		>,
		picturesBuffer: Buffer[],
		tagIds: TagData["id"][],
	) {
		const sessionId = randomUUID()

		try {
			await this.redisService.createSession(userData.id, sessionId)
			const pictureNames = await this.s3Service.uploadFiles(picturesBuffer)

			await this.repository.completeUser(
				{
					...userData,
					sessionId,
				},
				pictureNames,
				tagIds,
			)
			await this.redisService.deleteCompletingSession(userData.sessionId)

			return sessionId
		} catch (error) {
			await this.redisService.deleteSession(sessionId)

			throw error
		}
	}

	async publicLogout(resetingSessionId?: UserData["sessionId"]) {
		if (!resetingSessionId) throw new UnauthorizedException()

		await this.redisService.deleteResetingSession(resetingSessionId)
	}

	async logout(
		sessionId: NonNullable<UserData["sessionId"]>,
		completingSessionId: NonNullable<UserData["sessionId"]>,
		userId: UserData["id"],
	) {
		await this.repository.updateUserSessionId(userId, null)
		await this.redisService.deleteSession(sessionId)
		await this.redisService.deleteCompletingSession(completingSessionId)
	}

	/* ============ Users ============ */

	async getUsers(page: number, limit: number) {
		const users = await this.repository.getUsers(page, limit)

		for (const user of users.users) {
			const pictures = []

			if (user.firstName === "Ilyes") {
				const signedUrl = await this.s3Service.getSignedURL(
					user.principalPicture.name,
				)
				user.principalPicture.name = signedUrl
			}

			for (let i = 0; i < user.pictures.length; i++) {
				// TODO Retirer condition temporaire
				if (user.firstName === "Ilyes") {
					const signedUrl = await this.s3Service.getSignedURL(
						user.pictures[i].name,
					)
					user.pictures[i].name = signedUrl
				}
			}
		}

		return users
	}

	async getUser(userId: UserData["id"]) {
		const user = await this.repository.getUser(userId)

		if (user.firstName === "Ilyes") {
			const signedUrl = await this.s3Service.getSignedURL(
				user.principalPicture.name,
			)
			user.principalPicture.name = signedUrl
		}

		for (let i = 0; i < user.pictures.length; i++) {
			// TODO Retirer condition temporaire
			if (user.firstName === "Ilyes") {
				const signedUrl = await this.s3Service.getSignedURL(
					user.pictures[i].name,
				)
				user.pictures[i].name = signedUrl
			}
		}

		return user
	}

	getUserChats(userId: UserData["id"]) {
		return this.repository.getUserChats(userId)
	}

	getUserChatConversation(userId: UserData["id"], chatId: ChatData["id"]) {
		return this.repository.getUserChatConversation(userId, chatId)
	}

	getTags() {
		return this.repository.getTags()
	}

	/* ============ Utils ============ */

	getRandomToken(length = 32) {
		return randomBytes(length).toString("hex")
	}
}

export default appService
