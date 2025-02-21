import { FastifyInstance, FastifyPluginOptions } from "fastify"
import * as adminQueries from "@/db/queries/admin"

class dbRepository {
	private db

	constructor(db: FastifyInstance, options: FastifyPluginOptions) {
		this.db = db.pg
	}

	async initDb() {
		await this.db.query(adminQueries.createUuidExtensionMutation)
		await this.db.query(adminQueries.createGenderEnumMutation)
		await this.db.query(adminQueries.createSexualOrientationEnumMutation)
		await this.db.query(adminQueries.createUsersTableMutation)
		await this.db.query(adminQueries.createPicturesTableMutation)
		await this.db.query(adminQueries.createTagsTableMutation)
		await this.db.query(adminQueries.createUserTagsTableMutation)
	}
}

export default dbRepository
