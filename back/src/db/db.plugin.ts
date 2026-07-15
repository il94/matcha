import fastifyPostgres from "@fastify/postgres"
import { FastifyPluginAsync } from "fastify"
import dbRepository from "./db.repository"

const dbPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyPostgres, {
		connectionString: process.env.DATABASE_URL,
	})

	app.addHook("onReady", async () => {
		const repository = new dbRepository(app, options)

		try {
			await repository.initDb()
		} catch (error) {
			app.log.error(error, "Database initialization failed")
			process.exit(1)
		}
	})
}

export default dbPlugin
