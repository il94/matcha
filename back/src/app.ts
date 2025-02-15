import { FastifyPluginAsync } from "fastify"
import appErrorHandler from "./app.errorHandler"
import dbPlugin from "./db/db.plugin"
import fastifyPlugin from "fastify-plugin"
import appController from "./app/app.controller"
import adminController from "./admin/admin.controller"
import s3Plugin from "./s3/s3.plugin"
import redisPlugin from "./redis/redis.plugin"
import appPublicController from "./app/app.public-controller"

const build: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyPlugin(dbPlugin))
	app.register(fastifyPlugin(s3Plugin))
	app.register(fastifyPlugin(redisPlugin))

	app.register(appController)
	app.register(appPublicController)
	app.register(adminController, { prefix: "/admin" })

	app.setErrorHandler(appErrorHandler)
}

export default build
