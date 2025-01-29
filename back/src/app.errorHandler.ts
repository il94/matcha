import { FastifyErrorHandler } from "./fastify.types"
import { HttpException } from "@/lib/HttpException"

const appErrorHandler: FastifyErrorHandler = (error, request, reply) => {
	if (error instanceof HttpException) {
		const httpError = error as HttpException

		return reply.status(httpError.code).send({ message: httpError.message })
	}
	return reply
		.status(error.statusCode ?? 500)
		.send({ message: "UNKNOWN_ERROR" })
}

export default appErrorHandler
