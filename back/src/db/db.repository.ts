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
		await this.db.query(adminQueries.createChatsTableMutation)
		await this.db.query(adminQueries.createMessagesTableMutation)
		await this.db.query(adminQueries.createVotesTableMutation)
		await this.db.query(adminQueries.createViewsTableMutation)
		await this.db.query(adminQueries.createReportsTableMutation)
		await this.db.query(adminQueries.createUserBlocksTableMutation)
		await this.db.query(adminQueries.createNotificationsTableMutation)
	}
}

export default dbRepository
