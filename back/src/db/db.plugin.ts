import fastifyPostgres from "@fastify/postgres"
import { FastifyPluginAsync } from "fastify"
import dbRepository from "./db.repository"

const dbPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyPostgres, {
		connectionString: process.env.DATABASE_URL,
	})

	app.addHook("onReady", async () => {
		const repository = new dbRepository(app, options)

		repository.initDb()
	})
}

export default dbPlugin
