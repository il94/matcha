import "dotenv/config"
import appPlugin from "./app.plugin"
import fastify, { FastifyInstance } from "fastify"
import path from "path"
import fs from "fs"

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
		ajv: {
			plugins: [
				(ajv: any) => {
					ajv.addKeyword({
						keyword: "adult",
						type: "string",
						validate: (value: boolean, data: string) => {
							if (!value) return true

							const inputDate = new Date(data)
							const today = new Date()
							const minAdultDate = new Date()
							minAdultDate.setFullYear(today.getFullYear() - 18)

							return inputDate <= minAdultDate
						},
						errors: false,
					})
				},
			],
		},
	})

	app.register(appPlugin)

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
