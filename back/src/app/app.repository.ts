import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { BadRequestException } from "@/lib/HttpException"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import convertObjectKeysToCamelCase from "@/lib/convertObjectKeysToCamelCase"
import {
	createUserMutation,
	getChatMessagesQuery,
	getTagsQuery,
	getUserQuery,
	getUsersQuery,
	getUserChatsQuery,
	getUserChatQuery,
	getUserByUsernameQuery,
} from "@/db/queries"
import { updateUserSessionIdMutation } from "@/db/queries/updateUserMutationSessionIdMutation"

/*
	TODO

	- Envoyer url signee pour les images
	- Rechecker les types
	- Rechecker les modeles
*/

class appRepository {
	private db
	private s3

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
		this.s3 = app.s3
	}

	async createUser(
		userData: Omit<UserData, "id" | "createdAt">,
	): Promise<UserData[]> {
		if (!userData.bio) userData.bio = undefined
		if (!userData.elo) userData.elo = 0
		if (!userData.views) userData.views = 0
		if (!userData.matchs) userData.matchs = 0
		if (!userData.dates) userData.dates = 0

		try {
			const result = await this.db.query(
				createUserMutation,
				Object.values(userData),
			)

			const [user] = result.rows
			return user
		} catch (error) {
			throw new BadRequestException((error as Error).message)
		}
	}

	async getUsers(
		page: number,
		limit: number,
	): Promise<{
		users: UserData[]
		nextPage: number | null
	}> {
		const result = await this.db.query(getUsersQuery, [page, limit])

		for (const user of result.rows) {
			user.images = []
			for (const imageName of user.image_names) {
				// TODO Décommenter cette partie quand il y aura de vrais users
				// const s3Url = await this.getS3Url(imageName)
				// user.images.push(s3Url)

				// TODO Temporaire pour fake users
				user.images.push(imageName)
			}
			delete user.image_names
		}

		const users = convertObjectKeysToCamelCase(result.rows)
		const nextPage = result.rows.length >= limit ? page + 1 : null

		return {
			users,
			nextPage,
		}
	}

	async getUser(userId: UserData["id"]): Promise<UserData> {
		const result = await this.db.query(getUserQuery, [userId])

		result.rows[0].images = []
		for (const imageName of result.rows[0].image_names) {
			// TODO Décommenter cette partie quand il y aura de vrais users
			// const s3Url = await this.getS3Url(imageName)
			// result.rows[0].images.push(imageName)

			// TODO Temporaire pour fake users
			result.rows[0].images.push(imageName)
		}
		delete result.rows[0].image_names

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user
	}

	async getUserByUsername(
		username: UserData["username"],
	): Promise<Pick<UserData, "id" | "password">> {
		const result = await this.db.query(getUserByUsernameQuery, [username])

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user
	}

	async getUserChats(userId: UserData["id"]): Promise<
		{
			id: ChatData["id"]
			title: UserData["firstName"]
			lastMessage: {
				content: MessageData["content"]
				createdAt: MessageData["createdAt"]
			}
			avatar: ImageData["data"]
		}[]
	> {
		const result = await this.db.query(getUserChatsQuery, [userId])

		const chats = convertObjectKeysToCamelCase(result.rows)
		return chats
	}

	async getUserChat(
		userId: UserData["id"],
		chatId: ChatData["id"],
	): Promise<{
		id: ChatData["id"]
		title: UserData["firstName"]
		lastMessage: {
			content: MessageData["content"]
			createdAt: MessageData["createdAt"]
		}
		avatar: ImageData["data"]
	}> {
		const result = await this.db.query(getUserChatQuery, [userId, chatId])

		const [chat] = convertObjectKeysToCamelCase(result.rows)
		return chat
	}

	async updateUserSessionId(
		userId: UserData["id"],
		sessionId: UserData["sessionId"],
	) {
		const result = await this.db.query(updateUserSessionIdMutation, [
			userId,
			sessionId,
		])

		const [user] = result.rows
		return user
	}

	async getChatMessages(chatId: UserData["id"]): Promise<MessageData[]> {
		const result = await this.db.query(getChatMessagesQuery, [chatId])

		const messages = convertObjectKeysToCamelCase(result.rows)
		return messages
	}

	async getTags(): Promise<TagData[]> {
		const result = await this.db.query(getTagsQuery)

		const tags = convertObjectKeysToCamelCase(result.rows)
		return tags
	}

	async getS3Url(imageName: string) {
		const s3Url = await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: imageName,
			}),
			{ expiresIn: 15 * 60 },
		)

		return s3Url
	}
}

export default appRepository
