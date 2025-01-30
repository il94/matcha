import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	createImagesTableMutation,
	createUsersTableMutation,
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
	}
}

export default dbRepository
