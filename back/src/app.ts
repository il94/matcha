import { FastifyPluginAsync } from "fastify"
import appErrorHandler from "./app.errorHandler"
import appPlugin from "@/app/app.plugin"
import dbPlugin from "./db/db.plugin"
import fastifyPlugin from "fastify-plugin"

const build: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyPlugin(dbPlugin))
	app.register(appPlugin)

	app.setErrorHandler(appErrorHandler)
}

export default build
