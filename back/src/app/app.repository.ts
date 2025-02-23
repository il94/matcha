import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { BadRequestException, ForbiddenException } from "@/lib/HttpException"
import convertObjectKeysToCamelCase from "@/lib/convertObjectKeysToCamelCase"
import * as appQueries from "@/db/queries/app"
import { isPGError, PGException } from "@/lib/PGException"
import { PoolClient } from "pg"
import bcrypt from "bcrypt"
import capitalize from "@/lib/capitalize"

/*
	TODO

	- Envoyer url signee pour les photos
	- Rechecker les types
	- Rechecker les modeles
*/

class appRepository {
	private db

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
	}

	/* ============ Users ============ */

	async createUser(
		userData: Pick<
			UserData,
			"email" | "firstName" | "lastName" | "username" | "password"
		>,
		transact?: PoolClient,
	): Promise<UserData["id"]> {
		try {
			const executor = transact || this.db

			const result = await executor.query(appQueries.createUserMutation, [
				await bcrypt.hash(userData.password, 10),
				capitalize(userData.firstName),
				capitalize(userData.lastName),
				userData.username,
				userData.email,
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

		const users = convertObjectKeysToCamelCase(result.rows)
		const nextPage = result.rows.length >= limit ? page + 1 : null

		return {
			users,
			nextPage,
		}
	}

	async getUser(userId: UserData["id"]): Promise<UserData> {
		const result = await this.db.query(appQueries.getUserQuery, [userId])

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user
	}

	async getUserByUsername(
		username: UserData["username"],
	): Promise<Pick<UserData, "id" | "password" | "sessionId" | "completed">> {
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

	async isUserCompletedQuery(userId: UserData["id"]): Promise<boolean> {
		const result = await this.db.query(appQueries.isUserCompletedQuery, [
			userId,
		])

		const [user] = result.rows
		return user.completed
	}

	async getTags(): Promise<TagData[]> {
		const result = await this.db.query(appQueries.getTagsQuery)

		const tags = convertObjectKeysToCamelCase(result.rows)
		return tags
	}

	async activateUser(userId: UserData["id"], sessionId: UserData["sessionId"]) {
		await this.db.query(appQueries.activateUserMutation, [userId, sessionId])
	}

	async completeUser(
		userData: Pick<
			UserData,
			"id" | "sessionId" | "birthDate" | "gender" | "sexualOrientation" | "bio"
		>,
		pictureNames: PictureData["name"][],
		tagIds: TagData["id"][],
	) {
		await this.db.transact(async (transact) => {
			await transact.query(appQueries.completeUserMutation, [
				userData.id,
				userData.sessionId,
				userData.birthDate,
				userData.gender,
				userData.sexualOrientation,
				userData.bio,
			])

			for (let i = 0; i < pictureNames.length; i++) {
				await transact.query(appQueries.createPictureMutation, [
					userData.id,
					pictureNames[i],
					i === 0,
				])
			}

			await transact.query(appQueries.createUserTagsMutation, [
				userData.id,
				tagIds,
			])
		})
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

	async updateUserPassword(
		userId: UserData["id"],
		password: UserData["password"],
	) {
		await this.db.query(appQueries.updateUserPasswordMutation, [
			userId,
			await bcrypt.hash(password, 10),
		])
	}

	async deleteUser(userId: UserData["id"]) {
		await this.db.query(appQueries.deleteUserMutation, [userId])
	}
}

export default appRepository
