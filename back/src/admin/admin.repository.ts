import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { pictures } from "./data/pictures"
import { users } from "./data/users"
import bcrypt from "bcrypt"

import * as adminQueries from "@/db/queries/admin"
import * as appQueries from "@/db/queries/app"

class adminRepository {
	private db
	private log

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
		this.log = app.log
	}

	async fillDb() {
		await this.db.transact(async (transact) => {
			this.log.info("DB: Create uuid extension")
			await transact.query(adminQueries.createUuidExtensionMutation)

			this.log.info("DB: Create gender enum")
			await transact.query(adminQueries.createGenderEnumMutation)

			this.log.info("DB: Create sexualOrientation enum")
			await transact.query(adminQueries.createSexualOrientationEnumMutation)

			this.log.info("DB: Create user table")
			await transact.query(adminQueries.createUsersTableMutation)

			this.log.info("DB: Create pictures table")
			await transact.query(adminQueries.createPicturesTableMutation)

			this.log.info("DB: Create tags table")
			await transact.query(adminQueries.createTagsTableMutation)

			this.log.info("DB: Create user_tags table")
			await transact.query(adminQueries.createUserTagsTableMutation)

			this.log.info("DB: Create chats table")
			await transact.query(adminQueries.createChatsTableMutation)

			this.log.info("DB: Create messages table")
			await transact.query(adminQueries.createMessagesTableMutation)

			this.log.info("DB: Create votes table")
			await transact.query(adminQueries.createVotesTableMutation)

			this.log.info("DB: Create reports table")
			await transact.query(adminQueries.createReportsTableMutation)

			this.log.info("DB: Get tags")
			const tagsDb = await transact.query(appQueries.getTagsQuery)

			const userIds = []

			for (let i = 0; i < users.length; i++) {
				const { tags, data } = users[i]

				this.log.info("DB: Create user")
				const createUserResult = await transact.query(
					adminQueries.createUserMutation,
					[await bcrypt.hash(data[0] as string, 10), ...[...data].splice(1)],
				)
				const userCreated = createUserResult.rows[0]
				userIds.push(userCreated.id)
				for (let j = 0; j < pictures[i].length; j++) {
					this.log.info("DB: Create picture")
					await transact.query(appQueries.createPictureMutation, [
						userCreated.id,
						pictures[i][j],
						j === 0,
					])
				}

				for (const tag of tags) {
					const { id: tagId } = tagsDb.rows.find((tagDb) => tagDb.name === tag)
					this.log.info("DB: Create user tag")
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
