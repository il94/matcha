import { FastifyPluginAsync } from "fastify"
import {
	createImageMutation,
	createImagesTableMutation,
	createUserMutation,
	createUsersTableMutation,
	createUuidExtensionMutation,
	dropImagesTableMutation,
	dropUsersTableMutation,
} from "@/db/queries"
import { users } from "./data/users"
import { images } from "./data/images"

const adminController: FastifyPluginAsync = async (app, options) => {
	app.post("/", async () => {
		await app.pg.transact(async (transact) => {
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

		return "Db created"
	})

	app.delete("/", async () => {
		await app.pg.query(dropImagesTableMutation)
		await app.pg.query(dropUsersTableMutation)

		return "Db dropped"
	})
}

export default adminController
