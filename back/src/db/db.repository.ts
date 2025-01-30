import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	createUsersTableMutation,
	createUuidExtensionMutation,
} from "./queries"
import { createImagesTableMutation } from "./queries/createImagesTableMutation"

class dbRepository {
	private db

	constructor(db: FastifyInstance, options: FastifyPluginOptions) {
		this.db = db.pg
	}

	async initDb() {
		await this.db.query(createUuidExtensionMutation)
		await this.db.query(createUsersTableMutation)
		await this.db.query(createImagesTableMutation)
	}
}

export default dbRepository
