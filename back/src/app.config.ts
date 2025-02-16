import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import fastifyMultipart from "@fastify/multipart"
import { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"
import appLogger from "./app.logger"

const appConfig: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyCors, {
		origin: process.env.API_FRONT_URL,
		credentials: true,
	})
	app.register(fastifyCookie, {
		parseOptions: {
			httpOnly: true,
			sameSite: "none",
			maxAge: 3600,
			secure: true,
		},
	})
	app.register(fastifyMultipart, {
		limits: {
			fileSize: 50 * 1024 * 1024,
			files: 1,
		},
	})

	app.register(fastifyPlugin(appLogger))
}

export default appConfig
