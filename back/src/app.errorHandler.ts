import { FastifyErrorHandler } from "./fastify.types"
import { HttpException } from "@/lib/HttpException"
import { PGException } from "./lib/PGException"

const appErrorHandler: FastifyErrorHandler = (error, request, reply) => {
	if (error instanceof HttpException) {
		const httpError = error as HttpException

		return reply.status(httpError.code).send({ message: httpError.message })
	} else if (error instanceof PGException) {
		const pgError = error as PGException

		if (pgError.constraint === "users_username_key")
			return reply.status(403).send({ message: "Username already taken" })
		else if (pgError.constraint === "users_email_key")
			return reply.status(403).send({ message: "Email already taken" })
		else if (
			pgError.constraint === "users_elo_check" ||
			pgError.constraint === "users_views_check" ||
			pgError.constraint === "users_matchs_check" ||
			pgError.constraint === "users_dates_check"
		)
			return reply.status(400).send({ message: "UNKNOWN_ERROR" })
		else return reply.status(500).send({ message: "UNKNOWN_ERROR" })
	}
	return reply
		.status(error.statusCode ?? 500)
		.send({ message: "UNKNOWN_ERROR" })
}

export default appErrorHandler
