import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	createImagesTableMutation,
	createTagsTableMutation,
	createUsersTableMutation,
	createUserTagsTableMutation,
	createUuidExtensionMutation,
} from "./queries"

class dbRepository {
	private db

	constructor(db: FastifyInstance, options: FastifyPluginOptions) {
		this.db = db.pg
	}

	async initDb() {
		await this.db.query(createUuidExtensionMutation)
		await this.db.query(createUsersTableMutation)
		await this.db.query(createImagesTableMutation)
		await this.db.query(createTagsTableMutation)
		await this.db.query(createUserTagsTableMutation)
	}
}

export default dbRepository
