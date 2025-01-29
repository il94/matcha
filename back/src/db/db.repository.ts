import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { createUserTableMutation, createUuidExtensionMutation } from "./queries"

class dbRepository {
	private db

	constructor(db: FastifyInstance, options: FastifyPluginOptions) {
		this.db = db.pg
	}

	async initDb() {
		await this.db.query(createUuidExtensionMutation)
		await this.db.query(createUserTableMutation)
	}
}

export default dbRepository
