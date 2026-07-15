import { FastifyErrorHandler } from "./fastify.types"
import { HttpException, UnauthorizedException } from "@/lib/HttpException"
import { isPGError, PGException } from "./lib/PGException"
import { ERROR_CODES } from "@/lib/errorCodes"

const appErrorHandler: FastifyErrorHandler = (error, request, reply) => {
	if (error instanceof HttpException) {
		const httpError = error as HttpException

		if (httpError instanceof UnauthorizedException) {
			return reply
				.status(httpError.code)
				.clearCookie("sessionId")
				.clearCookie("completingSessionId")
				.clearCookie("resetingSessionId")
				.send({ message: httpError.message })
		}

		return reply.status(httpError.code).send({ message: httpError.message })
	} else if (isPGError(error)) {
		const pgError = error as PGException

		if (pgError.constraint === "users_username_key") {
			return reply
				.status(403)
				.send({ message: ERROR_CODES.USERNAME_ALREADY_TAKEN })
		} else if (pgError.constraint === "users_email_key") {
			if (request.url.includes("change-email"))
				return reply.redirect(
					`${process.env.API_FRONT_URL!}/settings?error=${ERROR_CODES.EMAIL_ALREADY_TAKEN}`,
				)

			return reply
				.status(403)
				.send({ message: ERROR_CODES.EMAIL_ALREADY_TAKEN })
		} else if (
			pgError.constraint === "users_elo_check" ||
			pgError.constraint === "no_self_vote" ||
			pgError.constraint === "no_self_chat" ||
			pgError.constraint === "no_self_block" ||
			pgError.constraint === "user_blocks_pkey"
		)
			return reply.status(400).send({ message: ERROR_CODES.UNKNOWN_ERROR })
		else return reply.status(500).send({ message: ERROR_CODES.UNKNOWN_ERROR })
	}
	return reply
		.status(error.statusCode ?? 500)
		.send({ message: ERROR_CODES.UNKNOWN_ERROR })
}

export default appErrorHandler
