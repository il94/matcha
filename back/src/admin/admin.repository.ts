import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { pictures } from "./data/pictures"
import { users } from "./data/users"
import bcrypt from "bcrypt"

import * as adminQueries from "@/db/queries/admin"
import * as appQueries from "@/db/queries/app"

class adminRepository {
	private db

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
	}

	async fillDb() {
		await this.db.transact(async (transact) => {
			console.log("DB: Create uuid extension")
			await transact.query(adminQueries.createUuidExtensionMutation)

			console.log("DB: Create user table")
			await transact.query(adminQueries.createUsersTableMutation)

			console.log("DB: Create pictures table")
			await transact.query(adminQueries.createPicturesTableMutation)

			console.log("DB: Create tags table")
			await transact.query(adminQueries.createTagsTableMutation)

			console.log("DB: Create user_tags table")
			await transact.query(adminQueries.createUserTagsTableMutation)

			console.log("DB: Create chats table")
			await transact.query(adminQueries.createChatsTableMutation)

			console.log("DB: Create messages table")
			await transact.query(adminQueries.createMessagesTableMutation)

			console.log("DB: Get tags")
			const tagsDb = await transact.query(appQueries.getTagsQuery)

			const userIds = []

			for (let i = 0; i < users.length; i++) {
				const { tags, data } = users[i]

				console.log("DB: Create user")
				const createUserResult = await transact.query(
					appQueries.createUserMutation,
					[await bcrypt.hash(data[0] as string, 10), ...data.splice(1)],
				)
				const userCreated = createUserResult.rows[0]
				userIds.push(userCreated.id)
				for (let j = 0; j < pictures[i].length; j++) {
					console.log("DB: Create picture")
					await transact.query(appQueries.createPictureMutation, [
						userCreated.id,
						pictures[i][j],
						j === 0,
					])
				}

				for (const tag of tags) {
					const { id: tagId } = tagsDb.rows.find((tagDb) => tagDb.name === tag)
					console.log("DB: Create user tag")
					await transact.query(appQueries.createUserTagMutation, [
						userCreated.id,
						tagId,
					])
				}

				if (userIds.length > 1) {
					console.log("DB: Create chat")
					const createChatresult = await transact.query(
						appQueries.createChatMutation,
						[userIds[i], userIds[i - 1]],
					)
					const chatCreated = createChatresult.rows[0]
					console.log("DB: Create message 1")
					await transact.query(appQueries.createMessageMutation, [
						chatCreated.id,
						userIds[i],
						"Hello",
					])
					console.log("DB: Create message 2")
					await transact.query(appQueries.createMessageMutation, [
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
			await transact.query(adminQueries.dropDatabaseMutation)
		})
	}
}

export default adminRepository
