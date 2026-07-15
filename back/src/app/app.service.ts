import { randomBytes, randomUUID } from "crypto"
import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	BadGatewayException,
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	UnauthorizedException,
} from "@/lib/HttpException"
import { ERROR_CODES } from "@/lib/errorCodes"
import bcrypt from "bcrypt"
import redisService from "@/redis/redis.service"
import mailerService from "@/mailer/mailer.service"
import s3Service from "@/s3/s3.service"
import axios from "axios"
import { NominatimLocation } from "@/types"
import { GetUsersFilters } from "@/db/queries/app"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"
import socketSend from "@/lib/socketSend"

class appService {
	private app
	private repository
	private s3Service
	private redisService
	private mailerService

	private NOMINATIM_HEADERS = {
		"User-Agent":
			"Matcha (matcha school project - contact: system.matcha@gmail.com)",
	}

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.app = app
		this.repository = new appRepository(app, options)
		this.s3Service = new s3Service(app, options)
		this.redisService = new redisService(app, options)
		this.mailerService = new mailerService(app, options)
	}

	/* ============= NOTIFICATIONS ============= */

	private async notify(
		recipientId: UserData["id"],
		senderId: UserData["id"],
		type: NotificationType,
	) {
		await this.repository.createNotification(recipientId, senderId, type)

		const socket = this.app.clients.get(recipientId)
		if (socket) socketSend(socket, "notification")
	}

	async getUserNotifications(userId: UserData["id"]) {
		const notifications = await this.repository.getUserNotifications(userId)

		for (const notification of notifications) {
			if (notification.sender.avatar) {
				notification.sender.avatar = await this.resolvePictureUrl(
					notification.sender.avatar,
				)
			}
		}

		return notifications
	}

	async markNotificationsRead(userId: UserData["id"]) {
		await this.repository.markNotificationsRead(userId)
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

	private async fetchNominatim<T>(
		path: "reverse" | "search",
		params: Record<string, string | number>,
	): Promise<T> {
		try {
			const response = await axios.get<T>(
				`https://nominatim.openstreetmap.org/${path}`,
				{
					params: { format: "json", ...params },
					headers: this.NOMINATIM_HEADERS,
				},
			)

			return response.data
		} catch {
			throw new BadGatewayException(ERROR_CODES.LOCATION_SERVICE_UNAVAILABLE)
		}
	}

	async getLocationByCoordinates(latitude: number, longitude: number) {
		const data = await this.fetchNominatim<NominatimLocation>("reverse", {
			lat: latitude,
			lon: longitude,
		})

		if (data.error) throw new NotFoundException(ERROR_CODES.LOCATION_NOT_FOUND)

		return this.getLocationLabel(data)
	}

	async getLocationByLabel(label: string) {
		const data = await this.fetchNominatim<NominatimLocation[]>("search", {
			q: label,
			addressdetails: 1,
			limit: 1,
		})
		const [location] = data

		if (!location) throw new NotFoundException(ERROR_CODES.LOCATION_NOT_FOUND)

		return {
			latitude: parseFloat(location.lat),
			longitude: parseFloat(location.lon),
		}
	}

	async getLocationSuggestions(label: string) {
		const data = await this.fetchNominatim<NominatimLocation[]>("search", {
			q: label,
			addressdetails: 1,
			limit: 2,
		})

		const suggestions = Array.from(
			new Set(data.map((suggestion) => this.getLocationLabel(suggestion))),
		) as string[]

		return suggestions
	}

	async complete(
		userData: Pick<
			UserData,
			"id" | "sessionId" | "birthDate" | "gender" | "sexualOrientation" | "bio"
		> & { longitude?: number; latitude?: number; locationLabel?: string },
		picturesBuffer: Buffer[],
		tagIds: TagData["id"][],
	) {
		if (
			userData.gender === Gender.UNDEFINED &&
			userData.sexualOrientation !== SexualOrientation.BI
		)
			throw new BadRequestException(
				ERROR_CODES.ORIENTATION_LOCKED_FOR_UNDEFINED_GENDER,
			)

		const sessionId = randomUUID()
		let locationSource: "gps" | "manual"
		let pictureNames: string[] = []

		try {
			if (userData.longitude && userData.latitude) {
				userData.locationLabel = await this.getLocationByCoordinates(
					userData.latitude,
					userData.longitude,
				)
				locationSource = "gps"
			} else if (userData.locationLabel) {
				const { latitude, longitude } = await this.getLocationByLabel(
					userData.locationLabel,
				)
				userData.longitude = longitude
				userData.latitude = latitude
				locationSource = "manual"
			} else {
				throw new BadRequestException(ERROR_CODES.LOCATION_REQUIRED)
			}

			pictureNames = await this.s3Service.uploadFiles(picturesBuffer)

			await this.repository.completeUser(
				{
					...userData,
					sessionId,
					longitude: userData.longitude,
					latitude: userData.latitude,
					locationLabel: userData.locationLabel,
					locationSource,
				},
				pictureNames,
				tagIds,
			)

			await this.redisService.createSession(userData.id, sessionId)
			await this.redisService.deleteCompletingSession(userData.sessionId)

			return sessionId
		} catch (error) {
			await this.s3Service.deleteFiles(pictureNames)
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
		await this.repository.updateUser(userId, {
			sessionId: null,
		})
		await this.redisService.deleteSession(sessionId)
		await this.redisService.deleteCompletingSession(completingSessionId)
	}

	/* ============ Users ============ */

	async createVote(
		userId: UserData["id"],
		targetId: UserData["id"],
		vote: boolean,
	) {
		if (vote && !(await this.repository.hasPrincipalPicture(userId)))
			throw new ForbiddenException(ERROR_CODES.PROFILE_PICTURE_REQUIRED)

		const result = await this.repository.createVote(userId, targetId, vote)

		if (vote)
			await this.notify(targetId, userId, result.match ? "match" : "like")

		return result
	}

	async createBlock(userId: UserData["id"], targetId: UserData["id"]) {
		await this.repository.createBlock(userId, targetId)
	}

	async createReport(
		userId: UserData["id"],
		targetId: UserData["id"],
		reason: string,
	) {
		await this.repository.createReport(userId, targetId, reason)
	}

	async getUsers(
		userId: UserData["id"],
		limit: number,
		filters: GetUsersFilters = {},
	) {
		const users = await this.repository.getUsers(userId, limit, filters)

		for (const user of users) {
			user.principalPicture.name = await this.resolvePictureUrl(
				user.principalPicture.name,
			)

			for (let i = 0; i < user.pictures.length; i++) {
				user.pictures[i].name = await this.resolvePictureUrl(
					user.pictures[i].name,
				)
			}
		}

		return users
	}

	async getUser(userId: UserData["id"], targetId?: UserData["id"]) {
		if (targetId && (await this.repository.isUserBlocked(userId, targetId)))
			throw new BadRequestException()

		const user = await this.repository.getUser(
			targetId ?? userId,
			targetId ? userId : undefined,
		)

		if (!user) throw new NotFoundException()

		if (targetId && targetId !== userId) {
			await this.repository.createView(userId, targetId)
			await this.notify(targetId, userId, "view")
		}

		user.principalPicture.name = await this.resolvePictureUrl(
			user.principalPicture.name,
		)

		for (let i = 0; i < user.pictures.length; i++) {
			user.pictures[i].name = await this.resolvePictureUrl(
				user.pictures[i].name,
			)
		}

		return user
	}

	async getUserChats(userId: UserData["id"]) {
		const chats = await this.repository.getUserChats(userId)
		for (const chat of chats) {
			chat.avatar = await this.resolvePictureUrl(chat.avatar)
		}

		return chats
	}

	async getUserViews(userId: UserData["id"]) {
		const users = await this.repository.getUserViews(userId)

		for (const user of users) {
			user.principalPicture.name = await this.resolvePictureUrl(
				user.principalPicture.name,
			)
		}

		return users
	}

	async getUserLikes(userId: UserData["id"]) {
		const users = await this.repository.getUserLikes(userId)

		for (const user of users) {
			user.principalPicture.name = await this.resolvePictureUrl(
				user.principalPicture.name,
			)
		}

		return users
	}

	async getUserChatConversation(
		userId: UserData["id"],
		chatId: ChatData["id"],
	) {
		const conversation = await this.repository.getUserChatConversation(
			userId,
			chatId,
		)

		if (!conversation) throw new NotFoundException()

		conversation.avatar = await this.resolvePictureUrl(conversation.avatar)

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

		const nextGender = userData.gender ?? user.gender
		if (nextGender === Gender.UNDEFINED) {
			if (
				userData.sexualOrientation &&
				userData.sexualOrientation !== SexualOrientation.BI
			)
				throw new BadRequestException(
					ERROR_CODES.ORIENTATION_LOCKED_FOR_UNDEFINED_GENDER,
				)
			if (userData.gender === Gender.UNDEFINED)
				userData.sexualOrientation = SexualOrientation.BI
		}

		if (userData.email) {
			if (await this.repository.getUserByEmail(userData.email))
				throw new ForbiddenException(ERROR_CODES.EMAIL_ALREADY_TAKEN)

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

		if (userData.newPassword) {
			const currentHash = await this.repository.getUserPassword(userId)

			if (
				!userData.currentPassword ||
				!currentHash ||
				!(await bcrypt.compare(userData.currentPassword, currentHash))
			)
				throw new ForbiddenException(ERROR_CODES.INVALID_PASSWORD)

			if (this.repository.isWordInPassword(userData.newPassword))
				throw new ForbiddenException(ERROR_CODES.WORD_IN_PASSWORD)
		}

		if (userData.longitude && userData.latitude) {
			userData.locationLabel = await this.getLocationByCoordinates(
				userData.latitude,
				userData.longitude,
			)
			userData.locationSource = "gps"
		} else if (userData.locationLabel) {
			const { latitude, longitude } = await this.getLocationByLabel(
				userData.locationLabel,
			)
			userData.longitude = longitude
			userData.latitude = latitude
			userData.locationSource = "manual"
		}

		await this.repository.updateUser(
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

		const userPictures = await this.repository.getUserPictures(userId)

		// Vérifier que les url d'images envoyées existent dans la base de données
		for (const pictureString of picturesString) {
			const pictureName = pictureString.match(/\/([^/?]+)(?:\?|$)/)
			if (!pictureName)
				throw new BadRequestException(ERROR_CODES.INVALID_PICTURE_URL)
			if (
				!userPictures.find((userPicture) => userPicture.name === pictureName[1])
			)
				throw new BadRequestException(ERROR_CODES.INVALID_PICTURE_URL_2)
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
	}

	async deleteVote(userId: UserData["id"], targetId: UserData["id"]) {
		const { wasMatch } = await this.repository.deleteVote(userId, targetId)

		if (wasMatch) await this.notify(targetId, userId, "unlike")
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

		await this.notify(receiverId, userId, "message")

		return {
			receiverId,
			message,
		}
	}

	/* ============ Utils ============ */

	getRandomToken(length = 32) {
		return randomBytes(length).toString("hex")
	}

	async resolvePictureUrl(name: string) {
		if (/^https?:\/\//.test(name)) return name
		return this.s3Service.getSignedURL(name)
	}

	getLocationLabel(location: NominatimLocation) {
		if (!location.address) return ""
		return `${location.address.road ? `${location.address.road + ", "}` : ""}${location.address.suburb ? `${location.address.suburb + ", "}` : ""}${location.address.city ? `${location.address.city + ", "}` : ""}${location.address.country ?? ``}`
	}
}

export default appService
