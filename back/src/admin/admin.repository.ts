import {
	createImageMutation,
	createImagesTableMutation,
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

class adminRepository {
	private db

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
	}

	async fillDb() {
		await this.db.transact(async (transact) => {
			await this.db.query(createUuidExtensionMutation)
			await this.db.query(createUsersTableMutation)
			await this.db.query(createImagesTableMutation)
			await this.db.query(createTagsTableMutation)
			await this.db.query(createUserTagsTableMutation)

			const tagsDb = await this.db.query(getTagsQuery)

			for (let i = 0; i < users.length; i++) {
				const { tags, data } = users[i]
				const result = await transact.query(createUserMutation, data)

				for (const image of images[i]) {
					await transact.query(createImageMutation, [result.rows[0].id, image])
				}

				for (const tag of tags) {
					const { id: tagId } = tagsDb.rows.find((tagDb) => tagDb.name === tag)
					await transact.query(createUserTagMutation, [result.rows[0].id, tagId])
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
