import { S3Client } from "@aws-sdk/client-s3"
import "fastify"
import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { JSONSchema } from "json-schema-to-ts"
import { Transporter } from "nodemailer"
import { WebSocket } from "ws"

declare module "fastify" {
	interface FastifyRequest {
		sessionId: string
		completingSessionId: string
		resetingSessionId: string
		userId: string
	}

	interface FastifyInstance {
		s3: S3Client
		mailer: Transporter
		clients: Map<UserData["id"], Set<WebSocket>>
	}
}

export type FastifyRouteSchema = {
	body?: JSONSchema & {
		properties: JSONSchema & {
			birthDate?: JSONSchema & {
				adult?: boolean
			}
		}
	}
	querystring?: JSONSchema
	params?: JSONSchema
}

export type FastifyErrorHandler = (
	error: FastifyError & { type?: string },
	request: FastifyRequest,
	reply: FastifyReply,
) => void
