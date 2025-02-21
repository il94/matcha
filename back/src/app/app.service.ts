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
			else await this.redisService.createTempSession(user.id, sessionId)
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
			userId = await this.repository.createUser({
				email: userData.email,
				firstName: capitalize(userData.firstName),
				lastName: capitalize(userData.lastName),
				username: userData.username,
				password: await bcrypt.hash(userData.password, 10),
			})

			await this.redisService.createActivationToken(userId, token)
			await this.mailerService.sendActivationTokenEmail(
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

	async verify(
		sessionId?: UserData["sessionId"],
		tempSessionId?: UserData["sessionId"],
	): Promise<{
		userId: UserData["id"]
		isAuthenticated: boolean
		isCompleting?: boolean
	}> {
		if (sessionId) {
			const userId = await this.redisService.getSession(sessionId)

			if (!userId) throw new UnauthorizedException()

			return {
				userId,
				isAuthenticated: true,
			}
		} else if (tempSessionId) {
			const userId = await this.redisService.getTempSession(tempSessionId)

			if (!userId || (await this.repository.isUserCompleted(userId)))
				throw new UnauthorizedException()

			return {
				userId,
				isAuthenticated: true,
				isCompleting: true,
			}
		}

		throw new UnauthorizedException()
	}

	async activate(token: string) {
		const userId = await this.redisService.getActivationToken(token)

		if (!userId) throw new BadRequestException()

		const sessionId = await this.redisService.createTempSession(userId)

		await this.repository.activateUser(userId, sessionId)
		await this.redisService.deleteActivationToken(token)

		return sessionId
	}

	/* ============= PRIVATE CONTROLLER ============= */

	async complete(
		userData: Pick<
			UserData,
			| "id"
			| "sessionId"
			| "birthDate"
			| "gender"
			| "sexualOrientation"
			| "bio"
			| "tags"
		>,
		picturesBuffer: Buffer[],
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
			)
			await this.redisService.deleteTempSession(userData.sessionId)

			return sessionId
		} catch (error) {
			await this.redisService.deleteSession(sessionId)

			throw error
		}
	}

	async logout(
		sessionId: NonNullable<UserData["sessionId"]>,
		tempSessionId: NonNullable<UserData["sessionId"]>,
		userId: UserData["id"],
	) {
		await this.repository.updateUserSessionId(userId, null)
		await this.redisService.deleteSession(sessionId)
		await this.redisService.deleteTempSession(tempSessionId)
	}

	/* ============ Users ============ */

	async getUsers(page: number, limit: number) {
		const users = await this.repository.getUsers(page, limit)

		for (const user of users.users) {
			const pictures = []
			for (let i = 0; i < user.pictures.length; i++) {
				// TODO Retirer condition temporaire
				if (user.firstName === "Ilyes") {
					const signedUrl = await this.s3Service.getSignedURL(
						user.pictures[i].name,
					)
					user.pictures[i].name = signedUrl
				} // TODO Temporaire pour fake users
				else pictures.push(user.pictures[i].name)
			}
		}

		return users
	}

	getUser(userId: UserData["id"]) {
		return this.repository.getUser(userId)
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
