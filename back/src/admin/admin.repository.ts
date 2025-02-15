import {
	createChatMutation,
	createChatsTableMutation,
	createImageMutation,
	createImagesTableMutation,
	createMessageMutation,
	createMessagesTableMutation,
	createTagsTableMutation,
	createUserMutation,
	createUsersTableMutation,
	createUserTagMutation,
	createUserTagsTableMutation,
	createUuidExtensionMutation,
	dropDatabase,
	getTagsQuery,
} from "@/db/queries"
import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { images } from "./data/images"
import { users } from "./data/users"
import bcrypt from "bcrypt"

class adminRepository {
	private db
	private log

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
		this.log = app.log
	}

	async fillDb() {
		await this.db.transact(async (transact) => {
			console.log("DB: Create uuid extension")
			await transact.query(createUuidExtensionMutation)

			console.log("DB: Create user table")
			await transact.query(createUsersTableMutation)

			console.log("DB: Create images table")
			await transact.query(createImagesTableMutation)

			console.log("DB: Create tags table")
			await transact.query(createTagsTableMutation)

			console.log("DB: Create user_tags table")
			await transact.query(createUserTagsTableMutation)

			console.log("DB: Create chats table")
			await transact.query(createChatsTableMutation)

			console.log("DB: Create messages table")
			await transact.query(createMessagesTableMutation)

			console.log("DB: Get tags")
			const tagsDb = await transact.query(getTagsQuery)

			const userIds = []

			for (let i = 0; i < users.length; i++) {
				const { tags, data } = users[i]

				console.log("DB: Create user")
				const createUserResult = await transact.query(createUserMutation, [
					await bcrypt.hash(data[0] as string, 10),
					...data.splice(1),
				])
				const userCreated = createUserResult.rows[0]
				userIds.push(userCreated.id)
				for (let j = 0; j < images[i].length; j++) {
					console.log("DB: Create image")
					await transact.query(createImageMutation, [
						userCreated.id,
						images[i][j],
						j === 0,
					])
				}

				for (const tag of tags) {
					const { id: tagId } = tagsDb.rows.find((tagDb) => tagDb.name === tag)
					console.log("DB: Create user tag")
					await transact.query(createUserTagMutation, [userCreated.id, tagId])
				}

				if (userIds.length > 1) {
					console.log("DB: Create chat")
					const createChatresult = await transact.query(createChatMutation, [
						userIds[i],
						userIds[i - 1],
					])
					const chatCreated = createChatresult.rows[0]
					console.log("DB: Create message 1")
					await transact.query(createMessageMutation, [
						chatCreated.id,
						userIds[i],
						"Hello",
					])
					console.log("DB: Create message 2")
					await transact.query(createMessageMutation, [
						chatCreated.id,
						userIds[i - 1],
						"Hola",
					])
				}
			}
		})
	}

	async dropDb() {
		await this.db.transact(async (transact) => {
			await transact.query(dropDatabase)
		})
	}
}

export default adminRepository
