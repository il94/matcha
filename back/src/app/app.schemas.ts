import { FastifyRouteSchema } from "@/fastify.types"
import { stringIdParam } from "./app.schemas-utils"
import schemasModels from "./app.schemas-models"
// TODO check les params de validation

export const userIdParam = stringIdParam("userId")
export const chatIdParam = stringIdParam("chatId")

/* ============= PUBLIC CONTROLLER ============= */

export const login = {
	body: {
		type: "object",
		properties: {
			username: schemasModels.username,
			password: schemasModels.passwordLogin,
		},
		required: ["username", "password"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const register = {
	body: {
		type: "object",
		properties: {
			email: schemasModels.email,
			username: schemasModels.username,
			firstName: schemasModels.firstName,
			lastName: schemasModels.lastName,
			password: schemasModels.password,
		},
		required: ["email", "username", "firstName", "lastName", "password"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const forgot = {
	body: {
		type: "object",
		properties: {
			email: schemasModels.email,
		},
		required: ["email"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const activate = {
	querystring: {
		type: "object",
		properties: {
			token: { type: "string" },
		},
		required: ["token"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const reset = {
	querystring: {
		type: "object",
		properties: {
			token: { type: "string" },
		},
		required: ["token"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const resetPassword = {
	body: {
		type: "object",
		properties: {
			password: schemasModels.password,
		},
		required: ["password"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const changeEmail = {
	querystring: {
		type: "object",
		properties: {
			token: { type: "string" },
		},
		required: ["token"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

/* ============= PRIVATE CONTROLLER ============= */

export const createVote = {
	body: {
		type: "object",
		properties: {
			targetId: { type: "string" },
			vote: { type: "boolean" },
		},
		required: ["targetId", "vote"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const getUsers = {
	querystring: {
		type: "object",
		properties: {
			page: { type: "number", default: 1 },
			limit: { type: "number", default: 5 },
		},
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const updateUser = {
	body: {
		type: "object",
		properties: {
			email: schemasModels.email,
			username: schemasModels.username,
			firstName: schemasModels.firstName,
			lastName: schemasModels.lastName,
			currentPassword: schemasModels.password,
			newPassword: schemasModels.password,
			birthDate: schemasModels.birthDate,
			gender: schemasModels.gender,
			sexualOrientation: schemasModels.sexualOrientation,
			bio: schemasModels.bio,
			tags: schemasModels.tags,
		},
		additionalProperties: false,
		minProperties: 1,
	},
} as const satisfies FastifyRouteSchema

export const updateUserPictures = {
	body: {
		type: "object",
		properties: {
			principalPicture: {
				anyOf: [schemasModels.principalPicture, { type: "object" }],
			},
			secondaryPicture1: {
				anyOf: [schemasModels.secondaryPicture1, { type: "object" }],
			},
			secondaryPicture2: {
				anyOf: [schemasModels.secondaryPicture2, { type: "object" }],
			},
			secondaryPicture3: {
				anyOf: [schemasModels.secondaryPicture3, { type: "object" }],
			},
			secondaryPicture4: {
				anyOf: [schemasModels.secondaryPicture4, { type: "object" }],
			},
		},
		required: ["principalPicture"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const complete = {
	body: {
		type: "object",
		properties: {
			birthDate: schemasModels.birthDate,
			gender: schemasModels.gender,
			sexualOrientation: schemasModels.sexualOrientation,
			bio: schemasModels.bio,
			tags: schemasModels.tags,
			principalPicture: schemasModels.principalPicture,
			secondaryPicture1: schemasModels.secondaryPicture1,
			secondaryPicture2: schemasModels.secondaryPicture2,
			secondaryPicture3: schemasModels.secondaryPicture3,
			secondaryPicture4: schemasModels.secondaryPicture4,
		},
		required: ["birthDate", "gender", "sexualOrientation", "tags", "bio"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema
