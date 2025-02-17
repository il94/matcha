import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import fastifyMultipart from "@fastify/multipart"
import { FastifyPluginAsync } from "fastify"

const appConfig: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyCors, {
		origin: process.env.CORS_ORIGIN,
		credentials: process.env.CORS_CREDENTIALS === "true",
	})
	app.register(fastifyCookie, {
		parseOptions: {
			httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
			sameSite: process.env.COOKIE_SAME_SITE as "strict" | "lax" | "none",
			maxAge: parseInt(process.env.COOKIE_MAX_AGE!),
			secure: process.env.COOKIE_SECURE === "true",
		},
	})
	app.register(fastifyMultipart, {
		limits: {
			fileSize: parseInt(process.env.MULTIPART_FILE_SIZE!),
			files: parseInt(process.env.MULTIPART_FILES!),
		},
	})
}

export default appConfig
