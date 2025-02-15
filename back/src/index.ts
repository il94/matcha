import "dotenv/config"
import build from "./app"
import fastify, { FastifyInstance } from "fastify"
import path from "path"
import fs from "fs"
import fp from "fastify-plugin"
import appLogger from "./app.logger"
import fastifyCors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"
import fastifyMultipart from "@fastify/multipart"

const setup = () => {
	const uploadDir = path.resolve(__dirname, "uploads")
	if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
}

export const init = (): FastifyInstance => {
	setup()

	const app = fastify({
		disableRequestLogging: true,
		logger: {
			transport: {
				target: "pino-pretty",
				options: {
					ignore: "pid,hostname",
					translateTime: "yyyy-mm-dd HH:MM:ss Z",
				},
			},
		},
		genReqId() {
			return undefined as unknown as string
		},
	})

	app.register(fastifyCors, {
		origin: process.env.API_FRONT_URL,
		credentials: true,
	})
	app.register(fastifyCookie)
	app.register(fastifyMultipart, {
		limits: {
			fileSize: 50 * 1024 * 1024,
			files: 1,
		},
	})

	app.register(fp(appLogger), { env: process.env.NODE_ENV })

	app.register(build)

	return app
}

const start = async () => {
	const app = init()

	try {
		await app.listen({
			port: process.env.BACK_PORT ? parseInt(process.env.BACK_PORT) : 3000,
			host: "0.0.0.0",
		})
	} catch (error) {
		app.log.error(error)
		process.exit(1)
	}
}

if (process.env.NODE_ENV !== "test") {
	start()
}
