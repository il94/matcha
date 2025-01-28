import "fastify"
import {
	FastifyError,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify"

declare module "fastify" {
	interface FastifyInstance {
		// db: Database TODO
	}
}

export type AppLoggerOptions = FastifyPluginOptions & {
	mode?: string
}

export type FastifyErrorHandler = (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) => void
