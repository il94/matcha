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

			console.log("DB: Create gender enum")
			await transact.query(adminQueries.createGenderEnumMutation)

			console.log("DB: Create sexualOrientation enum")
			await transact.query(adminQueries.createSexualOrientationEnumMutation)

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

			console.log("DB: Create user_votes table")
			await transact.query(adminQueries.createUserVotesTableMutation)

			console.log("DB: Get tags")
			const tagsDb = await transact.query(appQueries.getTagsQuery)

			const userIds = []

			for (let i = 0; i < users.length; i++) {
				const { tags, data } = users[i]

				console.log("DB: Create user")
				const createUserResult = await transact.query(
					adminQueries.createUserMutation,
					[await bcrypt.hash(data[0] as string, 10), ...[...data].splice(1)],
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
			}
		})
	}

	async createChats() {
		await this.db.query(adminQueries.deleteChatsMutation)

		await this.db.query(adminQueries.createChatMutation, ["ilandols", "mbappe"])
		await this.db.query(adminQueries.createChatMutation, [
			"ilandols",
			"hermione",
		])
		await this.db.query(adminQueries.createChatMutation, [
			"ilandols",
			"harleyquinn",
		])
	}

	async dropDb() {
		await this.db.transact(async (transact) => {
			await transact.query(adminQueries.dropDatabaseMutation)
		})
	}
}

export default adminRepository
