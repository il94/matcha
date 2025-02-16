import { S3Client } from "@aws-sdk/client-s3"
import "fastify"
import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { JSONSchema } from "json-schema-to-ts"

declare module "fastify" {
	interface FastifyRequest {
		sessionId: string
		userId: string
	}

	interface FastifyInstance {
		s3: S3Client
	}
}

export type FastifyRouteSchema = {
	body?: JSONSchema
	querystring?: JSONSchema
	params?: JSONSchema
}

export type FastifyErrorHandler = (
	error: FastifyError & { type?: string },
	request: FastifyRequest,
	reply: FastifyReply,
) => void
