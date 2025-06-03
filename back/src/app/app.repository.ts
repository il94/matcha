import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { ForbiddenException } from "@/lib/HttpException"
import convertObjectKeysToCamelCase from "@/lib/convertObjectKeysToCamelCase"
import * as appQueries from "@/db/queries/app"
import { PoolClient } from "pg"
import bcrypt from "bcrypt"
import capitalize from "@/lib/capitalize"
import * as fs from "fs"

/*
	TODO

	- Envoyer url signee pour les photos
	- Rechecker les types
	- Rechecker les modeles
*/

class appRepository {
	private db
	private words: Set<string>

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg

		try {
			const wordsFile = fs.readFileSync("./src/data/words.txt", "utf-8")

			this.words = new Set(wordsFile.split("\n").filter(Boolean))
		} catch (error) {
			app.log.error("Error reading words file:", error)
			this.words = new Set()
		}
	}

	/* ============ Users ============ */

	async createUser(
		userData: Pick<
			UserData,
			"email" | "firstName" | "lastName" | "username" | "password"
		>,
		transact?: PoolClient,
	): Promise<UserData["id"]> {
		const executor = transact || this.db

		if (this.isWordInPassword(userData.password))
			throw new ForbiddenException("WORD_IN_PASSWORD")

		const result = await executor.query(appQueries.createUserMutation, [
			await bcrypt.hash(userData.password, 10),
			capitalize(userData.firstName),
			capitalize(userData.lastName),
			userData.username,
			userData.email,
		])

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user.id
	}

	async getUsers(
		userId: UserData["id"],
		page: number,
		limit: number,
	): Promise<{
		users: UserData[]
		nextPage: number | null
	}> {
		const result = await this.db.query(appQueries.getUsersQuery, [
			userId,
			page,
			limit,
		])

		const users = convertObjectKeysToCamelCase(result.rows)
		const nextPage = result.rows.length >= limit ? page + 1 : null

		return {
			users,
			nextPage,
		}
	}

	async getUser(
		targetId: UserData["id"],
		userId?: UserData["id"],
	): Promise<UserData> {
		const result = await this.db.query(appQueries.getUserQuery, [
			targetId,
			userId ?? targetId,
		])

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

	async getUserPictures(
		userId: UserData["id"],
	): Promise<Pick<PictureData, "id" | "name">[]> {
		const result = await this.db.query(appQueries.getUserPicturesQuery, [
			userId,
		])

		const pictures = convertObjectKeysToCamelCase(result.rows)
		return pictures
	}

	async getUserChats(userId: UserData["id"]): Promise<ChatData[]> {
		const result = await this.db.query(appQueries.getUserChatsQuery, [userId])

		const chats = convertObjectKeysToCamelCase(result.rows)
		return chats
	}

	async getUserViews(
		userId: UserData["id"],
	): Promise<Pick<UserData, "id" | "firstName" | "principalPicture">[]> {
		const result = await this.db.query(appQueries.getUserViewsQuery, [userId])

		const users = convertObjectKeysToCamelCase(result.rows)
		return users
	}

	async getUserLikes(
		userId: UserData["id"],
	): Promise<Pick<UserData, "id" | "firstName" | "principalPicture">[]> {
		const result = await this.db.query(appQueries.getUserLikesQuery, [userId])

		const users = convertObjectKeysToCamelCase(result.rows)
		return users
	}

	async getUserChatConversation(
		userId: UserData["id"],
		chatId: ChatData["id"],
	): Promise<ChatData & Pick<UserData, "id">> {
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

	async updateUser(
		userId: UserData["id"],
		userData: Partial<UserData>,
		tagIds?: TagData["id"][],
	) {
		await this.db.transact(async (transact) => {
			await transact.query(appQueries.updateUserMutation, [userId, userData])

			if (tagIds) {
				await transact.query(appQueries.deleteUserTagsMutation, [userId])
				await transact.query(appQueries.updateUserTagsMutation, [
					userId,
					tagIds,
				])
			}
		})
	}

	async getTags(): Promise<TagData[]> {
		const result = await this.db.query(appQueries.getTagsQuery)

		const tags = convertObjectKeysToCamelCase(result.rows)
		return tags
	}

	async getChat(
		chatId: ChatData["id"],
	): Promise<Pick<ChatData, "userId1" | "userId2">> {
		const result = await this.db.query(appQueries.getChatQuery, [chatId])

		const [chat] = convertObjectKeysToCamelCase(result.rows)
		return chat
	}

	async activateUser(userId: UserData["id"], sessionId: UserData["sessionId"]) {
		await this.db.query(appQueries.activateUserMutation, [userId, sessionId])
	}

	async completeUser(
		userData: Pick<
			UserData,
			"id" | "sessionId" | "birthDate" | "gender" | "sexualOrientation" | "bio"
		> & {
			latitude: UserData["latitude"]
			longitude: UserData["longitude"]
			locationLabel: UserData["locationLabel"]
			locationSource: UserData["locationSource"]
		},
		pictureNames: PictureData["name"][],
		tagIds: TagData["id"][],
	) {
		await this.db.transact(async (transact) => {
			await transact.query(appQueries.completeUserMutation, [
				userData.id,
				userData.sessionId,

				userData.longitude,
				userData.latitude,
				userData.locationLabel,
				userData.locationSource,

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

	async updatePictures(
		userId: UserData["id"],
		pictureNames: PictureData["name"][],
	) {
		await this.db.transact(async (transact) => {
			await transact.query(appQueries.deleteUserPicturesMutation, [userId])
			for (let i = 0; i < pictureNames.length; i++) {
				await transact.query(appQueries.createPictureMutation, [
					userId,
					pictureNames[i],
					i === 0,
				])
			}
		})
	}

	async createMessage(
		chatId: ChatData["id"],
		messageData: Pick<MessageData, "authorId" | "content">,
	): Promise<MessageData> {
		const result = await this.db.query(appQueries.createMessageMutation, [
			chatId,
			messageData.authorId,
			messageData.content,
		])

		const [message] = convertObjectKeysToCamelCase(result.rows)
		return message
	}

	async createVote(
		userId: UserData["id"],
		targetId: UserData["id"],
		vote: boolean,
	) {
		return await this.db.transact(async (transact) => {
			await transact.query(appQueries.createVoteMutation, [
				userId,
				targetId,
				vote,
			])
			if (vote && (await this.isUserLiked(userId, targetId, transact))) {
				const chat = await this.createChat(userId, targetId, transact)
				return {
					match: true,
					chatId: chat.id,
				}
			}

			return { match: false }
		})
	}

	async createBlock(userId: UserData["id"], targetId: UserData["id"]) {
		return await this.db.transact(async (transact) => {
			await transact.query(appQueries.createUserBlockMutation, [
				userId,
				targetId,
			])
			await this.deleteVote(userId, targetId, transact)
			await this.deleteVote(targetId, userId, transact)
			await this.deleteChatByUserIds(userId, targetId, transact)
		})
	}

	async createReport(
		userId: UserData["id"],
		targetId: UserData["id"],
		reason: string,
	) {
		await this.db.query(appQueries.createReportMutation, [
			userId,
			targetId,
			reason,
		])
	}

	async isUserLiked(
		userId: UserData["id"],
		targetId: UserData["id"],
		transact?: PoolClient,
	): Promise<boolean> {
		const executor = transact || this.db

		const result = await executor.query(appQueries.isUserLikedQuery, [
			userId,
			targetId,
		])

		const [vote] = result.rows
		return !!vote
	}

	async createChat(
		userId1: UserData["id"],
		userId2: UserData["id"],
		transact?: PoolClient,
	): Promise<ChatData> {
		const executor = transact || this.db

		const result = await executor.query(appQueries.createChatMutation, [
			userId1,
			userId2,
		])

		const [chat] = convertObjectKeysToCamelCase(result.rows)
		return chat
	}

	async deleteChatByUserIds(
		userId1: UserData["id"],
		userId2: UserData["id"],
		transact?: PoolClient,
	) {
		const executor = transact || this.db
		await executor.query(appQueries.deleteChatByUserIdsMutation, [
			userId1,
			userId2,
		])
	}

	async deleteVote(
		userId: UserData["id"],
		targetId: UserData["id"],
		transact?: PoolClient,
	) {
		const executor = transact || this.db

		await executor.query(appQueries.deleteVoteMutation, [userId, targetId])

		if (await this.isUserLiked(userId, targetId, transact))
			await this.deleteChatByUserIds(userId, targetId, transact)
	}

	async isUserBlocked(
		userId: UserData["id"],
		targetId: UserData["id"],
		transact?: PoolClient,
	): Promise<boolean> {
		const executor = transact || this.db
		const result = await executor.query(appQueries.isUserBlockedQuery, [
			userId,
			targetId,
		])

		const [block] = result.rows
		return !!block
	}

	/* ============ Utils ============ */

	isWordInPassword(password: string) {
		for (const word of this.words) {
			if (password.toLowerCase().includes(word)) return true
		}
		return false
	}
}

export default appRepository
