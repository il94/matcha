import { FastifyRouteSchema } from "@/fastify.types"
import { stringIdParam } from "./app.schemas-utils"

// TODO check les params de validation

export const userIdParam = stringIdParam("userId")

export const loginSchema = {
	body: {
		type: "object",
		properties: {
			username: { type: "string" },
			password: { type: "string" },
		},
		required: ["username", "password"],
	},
} as const satisfies FastifyRouteSchema
