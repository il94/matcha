import {
	createImageMutation,
	createImagesTableMutation,
	createUserMutation,
	createUsersTableMutation,
	createUuidExtensionMutation,
	dropImagesTableMutation,
	dropUsersTableMutation,
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
			await transact.query(createUuidExtensionMutation)
			await transact.query(createUsersTableMutation)
			await transact.query(createImagesTableMutation)

			for (let i = 0; i < users.length; i++) {
				const result = await transact.query(createUserMutation, users[i])

				for (const image of images[i]) {
					await transact.query(createImageMutation, [result.rows[0].id, image])
				}
			}
		})
	}

	async dropDb() {
		await this.db.transact(async (transact) => {
			await transact.query(dropImagesTableMutation)
			await transact.query(dropUsersTableMutation)
		})
	}
}

export default adminRepository
