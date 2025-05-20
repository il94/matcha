import { FastifyPluginAsync } from "fastify"
import { HttpException } from "./lib/HttpException"
import { isPGError, PGException } from "./lib/PGException"

const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const BLUE = "\x1b[34m"

const END = "\x1b[0m"

const print = (color: string, message: string) => {
	return `${color}${message}${END}`
}

const appLogger: FastifyPluginAsync = async (app, options) => {
	app.addHook("onRequest", async (request) => {
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
				error,
				print(
					RED,
					`(${request.ip}) ${httpError.code} ${request.method} ${request.url}`,
				),
			)
		} else if (isPGError(error)) {
			const pgError = error as PGException

			if (
				pgError.constraint === "users_username_key" ||
				pgError.constraint === "users_email_key"
			) {
				request.log.error(
					error,
					print(RED, `(${request.ip}) ${403} ${request.method} ${request.url}`),
				)
			} else if (
				pgError.constraint === "users_elo_check" ||
				pgError.constraint === "no_self_chat"
			) {
				request.log.error(
					error,
					print(RED, `(${request.ip}) ${400} ${request.method} ${request.url}`),
				)
			} else {
				request.log.error(
					error,
					print(RED, `(${request.ip}) ${500} ${request.method} ${request.url}`),
				)
			}
		} else {
			request.log.error(
				error,
				print(RED, `(${request.ip}) ${500} ${request.method} ${request.url}`),
			)
		}
	})
}

export default appLogger
