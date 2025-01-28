import { FastifyPluginAsync } from "fastify"
import appErrorHandler from "./app.errorHandler"
import appPlugin from "./app.plugin"

const build: FastifyPluginAsync = async (app, options) => {
	// app.register(fp(dbPlugin)) TODO

	app.register(appPlugin)

	app.setErrorHandler(appErrorHandler)
}

export default build
