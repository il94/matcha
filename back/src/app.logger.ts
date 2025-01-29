import { FastifyPluginAsync } from "fastify"
import { HttpException } from "./lib/HttpException"
import { AppLoggerOptions } from "./fastify.types"

const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const BLUE = "\x1b[34m"

const END = "\x1b[0m"

const print = (color: string, message: string) => {
	return `${color}${message}${END}`
}

const appLogger: FastifyPluginAsync<AppLoggerOptions> = async (
	app,
	options,
) => {
	app.addHook("onRequest", async (request, reply) => {
		request.log.info(
			print(BLUE, `(${request.ip}) ${request.method} ${request.url}`),
		)
	})

	app.addHook("onResponse", async (request, reply) => {
		if (reply.statusCode < 400) {
			request.log.info(
				print(
					GREEN,
					`(${request.ip}) ${reply.statusCode} ${request.method} ${request.url}`,
				),
			)
		}
	})

	app.addHook("onError", async (request, reply, error) => {
		if (error instanceof HttpException) {
			const httpError = error as HttpException

			request.log.error(
				process.env.NODE_ENV === "development" ? error : null,
				print(
					RED,
					`(${request.ip}) ${httpError.code} ${request.method} ${request.url}`,
				),
			)
		} else {
			request.log.error(
				process.env.NODE_ENV === "development" ? error : null,
				print(RED, `(${request.ip}) ${500} ${request.method} ${request.url}`),
			)
		}
	})
}

export default appLogger
