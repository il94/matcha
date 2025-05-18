import { randomBytes, randomUUID } from "crypto"
import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	UnauthorizedException,
} from "@/lib/HttpException"
import bcrypt from "bcrypt"
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

	async createUserVote(
		userId: UserData["id"],
		targetId: UserData["id"],
		vote: boolean,
	) {
		const isMatch = await this.repository.createUserVote(userId, targetId, vote)

		return isMatch
	}

	async getUsers(userId: UserData["id"], page: number, limit: number) {
		const users = await this.repository.getUsers(userId, page, limit)

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

	async getUserChats(userId: UserData["id"]) {
		const chats = await this.repository.getUserChats(userId)
		for (const chat of chats) {
			chat.avatar = await this.s3Service.getSignedURL(chat.avatar)
		}

		return chats
	}

	async getUserChatConversation(
		userId: UserData["id"],
		chatId: ChatData["id"],
	) {
		const conversation = await this.repository.getUserChatConversation(
			userId,
			chatId,
		)
		conversation.avatar = await this.s3Service.getSignedURL(conversation.avatar)

		return conversation
	}

	async updateUser(
		userId: UserData["id"],
		userData: Partial<
			UserData & {
				currentPassword: string
				newPassword: string
			}
		>,
		tagIds?: number[],
	) {
		const user = await this.repository.getUser(userId)

		if (userData.email) {
			if (await this.repository.getUserByEmail(userData.email))
				throw new ForbiddenException("EMAIL_ALREADY_TAKEN")

			const token = this.getRandomToken()
			try {
				await this.redisService.createNewEmailToken(
					user.id,
					userData.email,
					token,
				)
				await this.mailerService.sendNewEmailEmail(userData.email, token)
			} catch (error) {
				await this.redisService.deleteNewEmailToken(token)
				throw error
			}
		}

		if (
			userData.username &&
			(await this.repository.getUserByUsername(userData.username))
		)
			throw new ForbiddenException("USERNAME_ALREADY_TAKEN")
		else if (
			userData.newPassword &&
			(!userData.currentPassword ||
				!(await bcrypt.compare(userData.currentPassword, user.password)))
		)
			throw new ForbiddenException("INVALID_PASSWORD")

		this.repository.updateUser(
			userId,
			{
				...userData,
				email: undefined,
				password: userData.newPassword
					? await bcrypt.hash(userData.newPassword, 10)
					: undefined,
			},
			tagIds,
		)
	}

	async updateUserPictures(
		userId: UserData["id"],
		pictures: (string | Buffer)[],
	) {
		const { picturesBuffer, picturesString } = pictures.reduce(
			(acc, picture) => {
				if (typeof picture === "string") {
					acc.picturesString.push(picture)
				} else {
					acc.picturesBuffer.push(picture)
				}
				return acc
			},
			{ picturesBuffer: [] as Buffer[], picturesString: [] as string[] },
		)

		try {
			const userPictures = await this.repository.getUserPictures(userId)

			// Vérifier que les url d'images envoyées existent dans la base de données
			for (const pictureString of picturesString) {
				const pictureName = pictureString.match(/\/([^/?]+)(?:\?|$)/)
				if (!pictureName) throw new BadRequestException("INVALID_PICTURE_URL")
				if (
					!userPictures.find(
						(userPicture) => userPicture.name === pictureName[1],
					)
				)
					throw new BadRequestException("INVALID_PICTURE_URL_2")
			}

			const pictureNames = await this.s3Service.uploadFiles(picturesBuffer)

			const finalPictures: string[] = []

			let bufferIndex = 0

			for (const picture of pictures) {
				if (typeof picture === "string") {
					const fileName = picture.match(/\/([^/?]+)(?:\?|$)/)
					if (!fileName) throw new BadRequestException()

					finalPictures.push(fileName[1])
				} else {
					finalPictures.push(pictureNames[bufferIndex])
					bufferIndex++
				}
			}

			// Ajouter les fichiers restants (si jamais il y a eu plus de buffers que prévu dans pictures)
			while (bufferIndex < pictureNames.length) {
				finalPictures.push(pictureNames[bufferIndex])
				bufferIndex++
			}

			await this.repository.updatePictures(userId, finalPictures)
			await this.s3Service.deleteFiles(
				userPictures
					.map((picture) => picture.name)
					.filter((picture) => !finalPictures.includes(picture)),
			)
		} catch (error) {
			throw error
		}
	}

	async changeEmail(token: string) {
		const value = await this.redisService.getNewEmailToken(token)
		if (!value) throw new BadRequestException()

		try {
			const { userId, newEmail } = JSON.parse(value) as {
				userId: UserData["id"]
				newEmail: UserData["email"]
			}

			await this.repository.updateUser(userId, { email: newEmail })
		} finally {
			await this.redisService.deleteNewEmailToken(token)
		}
	}

	getTags() {
		return this.repository.getTags()
	}

	/* ============= WEBSOCKETS CONTROLLER ============= */

	async createMessage(
		userId: UserData["id"],
		chatId: ChatData["id"],
		content: string,
	) {
		const chat = await this.repository.getChat(chatId)

		if (!chat) throw new NotFoundException()

		const authorId =
			userId === chat.userId1
				? chat.userId1
				: userId === chat.userId2
					? chat.userId2
					: undefined
		if (!authorId) throw new BadRequestException()

		const message = await this.repository.createMessage(chatId, {
			authorId,
			content,
		})

		const receiverId = userId === chat.userId1 ? chat.userId2 : chat.userId1

		return {
			receiverId,
			message,
		}
	}

	/* ============ Utils ============ */

	getRandomToken(length = 32) {
		return randomBytes(length).toString("hex")
	}
}

export default appService
