import "fastify"
import {
	FastifyError,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify"

export type AppLoggerOptions = FastifyPluginOptions & {
	mode?: string
}

export type FastifyErrorHandler = (
	error: FastifyError & { type?: string },
	request: FastifyRequest,
	reply: FastifyReply,
) => void
