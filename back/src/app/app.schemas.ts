import { FastifyRouteSchema } from "@/fastify.types"
import { stringIdParam } from "./app.schemas-utils"
import SexualOrientation from "@/data/SexualOrientation"
import Gender from "@/data/Gender"

// TODO check les params de validation

export const userIdParam = stringIdParam("userId")
export const chatIdParam = stringIdParam("chatId")

/* ============= PUBLIC CONTROLLER ============= */

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
		},
		required: ["email", "firstName", "lastName", "username", "password"],
	},
} as const satisfies FastifyRouteSchema

export const forgot = {
	body: {
		type: "object",
		properties: {
			email: { type: "string", minLength: 1, maxLength: 256, format: "email" },
		},
		required: ["email"],
	},
} as const satisfies FastifyRouteSchema

export const activate = {
	querystring: {
		type: "object",
		properties: {
			token: { type: "string" },
		},
		required: ["token"],
	},
} as const satisfies FastifyRouteSchema

export const reset = {
	querystring: {
		type: "object",
		properties: {
			token: { type: "string" },
		},
		required: ["token"],
	},
} as const satisfies FastifyRouteSchema

export const resetPassword = {
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
		},
		required: ["password"],
	},
} as const satisfies FastifyRouteSchema

/* ============= PRIVATE CONTROLLER ============= */

export const getUsers = {
	querystring: {
		type: "object",
		properties: {
			page: { type: "number", default: 1 },
			limit: { type: "number", default: 5 },
		},
	},
} as const satisfies FastifyRouteSchema

export const complete = {
	body: {
		type: "object",
		properties: {
			birthDate: { type: "string", format: "date", adult: true },
			gender: { type: "string", enum: Object.values(Gender) },
			sexualOrientation: {
				type: "string",
				enum: Object.values(SexualOrientation),
			},
			tags: { type: "string", pattern: "^(\\[\\d+(?:,\\s*\\d+)*\\]|\\[\\])$" },
			bio: { type: "string", maxLength: 256 },
			principalPicture: { type: "object" },
			secondaryPicture1: { type: "object" },
			secondaryPicture2: { type: "object" },
			secondaryPicture3: { type: "object" },
			secondaryPicture4: { type: "object" },
		},
		required: ["birthDate", "gender", "sexualOrientation", "tags", "bio"],
	},
} as const satisfies FastifyRouteSchema
