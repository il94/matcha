import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { BadRequestException, ForbiddenException } from "@/lib/HttpException"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import convertObjectKeysToCamelCase from "@/lib/convertObjectKeysToCamelCase"
import * as appQueries from "@/db/queries/app"
import { isPGError, PGException } from "@/lib/PGException"
import { PoolClient } from "pg"

/*
	TODO

	- Envoyer url signee pour les photos
	- Rechecker les types
	- Rechecker les modeles
*/

class appRepository {
	private db
	private s3

	private S3_IMAGES_DURATION = 15 * 60

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
		this.s3 = app.s3
	}

	/* ============ Users ============ */

	async createUser(
		userData: Omit<
			UserData,
			"id" | "createdAt" | "sessionId" | "pictures" | "tags"
		>,
		transact?: PoolClient,
	): Promise<UserData["id"]> {
		try {
			const executor = transact || this.db

			const result = await executor.query(appQueries.createUserMutation, [
				userData.password,
				userData.firstName,
				userData.lastName,
				userData.username,
				userData.email,
				userData.birthDate,
				userData.sexualOrientation,
				userData.gender,
				userData.bio,
				userData.elo,
				userData.views,
				userData.matchs,
				userData.dates,
			])

			const [user] = convertObjectKeysToCamelCase(result.rows)
			return user.id
		} catch (error) {
			if (isPGError(error))
				throw new PGException(error.message, error.constraint)
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
		const result = await this.db.query(appQueries.getUsersQuery, [page, limit])

		for (const user of result.rows) {
			user.pictures = []
			for (const pictureName of user.picture_names) {
				// TODO Décommenter cette partie quand il y aura de vrais users
				// const s3Url = await this.getS3Url(pictureName)
				// user.pictures.push(s3Url)

				// TODO Temporaire pour fake users
				user.pictures.push(pictureName)
			}
			delete user.picture_names
		}

		const users = convertObjectKeysToCamelCase(result.rows)
		const nextPage = result.rows.length >= limit ? page + 1 : null

		return {
			users,
			nextPage,
		}
	}

	async getUser(userId: UserData["id"]): Promise<UserData> {
		const result = await this.db.query(appQueries.getUserQuery, [userId])

		result.rows[0].pictures = []
		for (const pictureName of result.rows[0].picture_names) {
			// TODO Décommenter cette partie quand il y aura de vrais users
			// const s3Url = await this.getS3Url(pictureName)
			// result.rows[0].pictures.push(pictureName)

			// TODO Temporaire pour fake users
			result.rows[0].pictures.push(pictureName)
		}
		delete result.rows[0].picture_names

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user
	}

	async getUserByUsername(
		username: UserData["username"],
	): Promise<Pick<UserData, "id" | "password" | "sessionId">> {
		const result = await this.db.query(appQueries.getUserByUsernameQuery, [
			username,
		])

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user
	}

	async getUserByEmail(
		email: UserData["email"],
	): Promise<Pick<UserData, "id" | "password" | "sessionId">> {
		const result = await this.db.query(appQueries.getUserByEmailQuery, [email])

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user
	}

	async getUserChats(userId: UserData["id"]): Promise<ChatData[]> {
		const result = await this.db.query(appQueries.getUserChatsQuery, [userId])

		const chats = convertObjectKeysToCamelCase(result.rows)
		return chats
	}

	async getUserChatConversation(
		userId: UserData["id"],
		chatId: ChatData["id"],
	): Promise<ChatData> {
		const result = await this.db.query(
			appQueries.getUserChatConversationQuery,
			[userId, chatId],
		)

		const [chat] = convertObjectKeysToCamelCase(result.rows)
		return chat
	}

	async getTags(): Promise<TagData[]> {
		const result = await this.db.query(appQueries.getTagsQuery)

		const tags = convertObjectKeysToCamelCase(result.rows)
		return tags
	}

	async getS3Url(pictureName: string) {
		const s3Url = await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: pictureName,
			}),
			{ expiresIn: this.S3_IMAGES_DURATION },
		)

		return s3Url
	}

	async activateUser(userId: UserData["id"], sessionId: UserData["sessionId"]) {
		await this.db.query(appQueries.activateUserMutation, [userId, sessionId])
	}

	async updateUserSessionId(
		userId: UserData["id"],
		sessionId: UserData["sessionId"],
	) {
		await this.db.query(appQueries.updateUserSessionIdMutation, [
			userId,
			sessionId,
		])
	}
}

export default appRepository
