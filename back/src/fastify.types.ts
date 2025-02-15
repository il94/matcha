import { S3Client } from "@aws-sdk/client-s3"
import "fastify"
import {
	FastifyError,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify"
import { JSONSchema } from "json-schema-to-ts"

declare module "fastify" {
	interface FastifyInstance {
		s3: S3Client
	}
}

export type FastifyRouteSchema = {
	body?: JSONSchema
	querystring?: JSONSchema
	params?: JSONSchema
}

export type AppLoggerOptions = FastifyPluginOptions & {
	mode?: string
}

export type FastifyErrorHandler = (
	error: FastifyError & { type?: string },
	request: FastifyRequest,
	reply: FastifyReply,
) => void
