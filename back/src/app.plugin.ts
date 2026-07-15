import { FastifyPluginAsync } from "fastify"
import appErrorHandler from "./app.errorHandler"
import dbPlugin from "./db/db.plugin"
import fastifyPlugin from "fastify-plugin"
import appController from "./app/app.controller"
import adminController from "./admin/admin.controller"
import s3Plugin from "./s3/s3.plugin"
import redisPlugin from "./redis/redis.plugin"
import appPublicController from "./app/app.public-controller"
import appConfig from "./app.config"
import mailerPlugin from "./mailer/mailer.plugin"
import schedulerPlugin from "./scheduler/scheduler.plugin"
import appLogger from "./app.logger"
import wsPlugin from "./ws/ws.plugin"
import rateLimitPlugin from "./rateLimit/rateLimit.plugin"

const appPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyPlugin(appConfig))

	app.register(fastifyPlugin(dbPlugin))
	app.register(fastifyPlugin(s3Plugin))
	app.register(fastifyPlugin(redisPlugin))
	app.register(fastifyPlugin(rateLimitPlugin))
	app.register(fastifyPlugin(mailerPlugin))
	app.register(fastifyPlugin(schedulerPlugin))
	app.register(fastifyPlugin(wsPlugin))
	app.register(fastifyPlugin(appLogger))

	app.register(adminController, { prefix: "/admin" }) // TODO Supprimer le plugin entier à la fin

	app.register(appController)
	app.register(appPublicController)

	app.setErrorHandler(appErrorHandler)
}

export default appPlugin
