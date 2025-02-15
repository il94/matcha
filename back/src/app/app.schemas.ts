import { FastifyRouteSchema } from "@/fastify.types"
import { stringIdParam } from "./app.schemas-utils"

// TODO check les params de validation

export const userIdParam = stringIdParam("userId")
export const chatIdParam = stringIdParam("chatId")

// TODO
export const postUser = {
	body: {
		type: "object",
		properties: {
			password: { type: "string" },
			firstName: { type: "string" },
			lastName: { type: "string" },
			username: { type: "string" },
			email: { type: "string" },
			birthDate: { type: "string" },
			sexualOrientation: { type: "string" },
			gender: { type: "string", default: null },
			bio: { type: "string", default: null },
			elo: { type: "number", default: 0 },
			views: { type: "number", default: 0 },
			matchs: { type: "number", default: 0 },
			dates: { type: "number", default: 0 },
		},
		required: [
			"password",
			"firstName",
			"lastName",
			"email",
			"username",
			"birthDate",
			"sexualOrientation",
		],
	},
} as const satisfies FastifyRouteSchema

export const getUsers = {
	querystring: {
		type: "object",
		properties: {
			page: { type: "number", default: 1 },
			limit: { type: "number", default: 5 },
		},
	},
} as const satisfies FastifyRouteSchema

export const login = {
	body: {
		type: "object",
		properties: {
			username: { type: "string" },
			password: { type: "string" },
		},
		required: ["username", "password"],
	},
} as const satisfies FastifyRouteSchema
