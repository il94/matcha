import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { PoolClient, QueryResult } from "pg"
import {
	pictures,
	users,
	devUser,
	devUserPictures,
	SeedUser,
} from "./data/generateUsers"
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

	// Insère un profil seed complet (user + photos + tags) dans la transaction
	// courante. Partagé par `fillDb` (les ~500 personnages) et `fillDevUser`
	// (le seul compte dev). Suppose que les tags existent déjà (`tagsDb`).
	private async insertSeedUser(
		transact: PoolClient,
		tagsDb: QueryResult,
		hashedPassword: string,
		user: SeedUser,
		userPictures: string[],
	): Promise<string> {
		const createUserResult = await transact.query(
			adminQueries.createUserMutation,
			[hashedPassword, ...user.data.slice(1)],
		)
		const userCreated = createUserResult.rows[0]

		for (let j = 0; j < userPictures.length; j++) {
			await transact.query(appQueries.createPictureMutation, [
				userCreated.id,
				userPictures[j],
				j === 0,
			])
		}

		for (const tag of user.tags) {
			const { id: tagId } = tagsDb.rows.find((tagDb) => tagDb.name === tag)
			await transact.query(appQueries.createUserTagMutation, [
				userCreated.id,
				tagId,
			])
		}

		return userCreated.id
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

			this.log.info("DB: Create user_blocks table")
			await transact.query(adminQueries.createUserBlocksTableMutation)

			this.log.info("DB: Create chats table")
			await transact.query(adminQueries.createChatsTableMutation)

			this.log.info("DB: Create messages table")
			await transact.query(adminQueries.createMessagesTableMutation)

			this.log.info("DB: Create votes table")
			await transact.query(adminQueries.createVotesTableMutation)

			this.log.info("DB: Create views table")
			await transact.query(adminQueries.createViewsTableMutation)

			this.log.info("DB: Create reports table")
			await transact.query(adminQueries.createReportsTableMutation)

			this.log.info("DB: Create notifications table")
			await transact.query(adminQueries.createNotificationsTableMutation)

			this.log.info("DB: Get tags")
			const tagsDb = await transact.query(appQueries.getTagsQuery)

			// Tous les comptes seed partagent le même mot de passe : on le hache
			// une seule fois au lieu de 500+ bcrypt (≈ 30 s économisées).
			const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD || 'password', 10)

			this.log.info(`DB: Create ${users.length} users`)
			const userIds = []

			for (let i = 0; i < users.length; i++) {
				const id = await this.insertSeedUser(
					transact,
					tagsDb,
					hashedPassword,
					users[i],
					pictures[i],
				)
				userIds.push(id)

				if ((i + 1) % 50 === 0)
					this.log.info(`DB: ${i + 1}/${users.length} users created`)
			}
		})
	}

	// Seed du seul compte dev, exclu des ~500 profils générés.
	// Appelé par `npm run seed:dev` (cf. seed.dev.ts). Le schéma et les tags
	// sont créés au préalable par `dbPlugin` (onReady → initDb) au app.ready().
	async fillDevUser() {
		await this.db.transact(async (transact) => {
			const tagsDb = await transact.query(appQueries.getTagsQuery)
			const hashedPassword = await bcrypt.hash(
				process.env.SEED_PASSWORD || "password",
				10,
			)

			this.log.info(`DB: Create dev user "${devUser.data[3]}"`)
			await this.insertSeedUser(
				transact,
				tagsDb,
				hashedPassword,
				devUser,
				devUserPictures,
			)
		})
	}

	async createChats() {
		await this.db.query(adminQueries.deleteChatsMutation)

		const devUsername = devUser.data[3]

		await this.db.query(adminQueries.createChatMutation, [devUsername, "mbappe"])
		await this.db.query(adminQueries.createChatMutation, [
			devUsername,
			"hermione",
		])
		await this.db.query(adminQueries.createChatMutation, [
			devUsername,
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
