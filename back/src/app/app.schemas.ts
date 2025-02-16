import { FastifyRouteSchema } from "@/fastify.types"
import { stringIdParam } from "./app.schemas-utils"

// TODO check les params de validation

export const userIdParam = stringIdParam("userId")
export const chatIdParam = stringIdParam("chatId")

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
			username: { type: "string", minLength: 1, maxLength: 128 },
			password: { type: "string", minLength: 1, maxLength: 128 },
		},
		required: ["username", "password"],
	},
} as const satisfies FastifyRouteSchema

export const register = {
	body: {
		type: "object",
		properties: {
			password: {
				type: "string",
				minLength: 8,
				maxLength: 128,
				allOf: [
					{ pattern: "[a-z]" },
					{ pattern: "[A-Z]" },
					{ pattern: "[0-9]" },
					{ pattern: '[!@#$%^&*(),.?":{}|<>]' },
				],
			},
			firstName: { type: "string", minLength: 1, maxLength: 64 },
			lastName: { type: "string", minLength: 1, maxLength: 64 },
			username: { type: "string", minLength: 1, maxLength: 32 },
			email: { type: "string", minLength: 1, maxLength: 256, format: "email" },

			birthDate: { type: "string", format: "date" },
			sexualOrientation: { type: "string" }, // TODO
			gender: { type: "string", default: null }, // TODO
			bio: { type: "string", default: null },
			elo: { type: "number", minimum: 0, maximum: 1000, default: 0 },
			views: { type: "number", minimum: 0, default: 0 },
			matchs: { type: "number", minimum: 0, default: 0 },
			dates: { type: "number", minimum: 0, default: 0 },
		},
		required: ["email", "firstName", "lastName", "username", "password"],
	},
} as const satisfies FastifyRouteSchema
