import { FastifyRouteSchema } from "@/fastify.types"
import schemasModels from "./app.schemas-models"
// TODO check les params de validation

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
			targetId: schemasModels.id,
			vote: { type: "boolean" },
		},
		required: ["targetId", "vote"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const createReport = {
	body: {
		type: "object",
		properties: {
			targetId: schemasModels.id,
			reason: { type: "string" },
		},
		required: ["targetId", "reason"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const createBlock = {
	body: {
		type: "object",
		properties: {
			targetId: schemasModels.id,
		},
		required: ["targetId"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const getLocationByCoordinates = {
	querystring: {
		type: "object",
		properties: {
			latitude: { type: "number" },
			longitude: { type: "number" },
		},
		required: ["latitude", "longitude"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const getLocationSuggestions = {
	querystring: {
		type: "object",
		properties: {
			label: { type: "string" },
		},
		required: ["label"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const getUsers = {
	querystring: {
		type: "object",
		properties: {
			limit: { type: "number", default: 5 },
			minAge: { type: "number", minimum: 18 },
			maxAge: { type: "number", minimum: 18 },
			maxDistance: { type: "number", minimum: 0 },
			minElo: { type: "number", minimum: 0, maximum: 1000 },
			maxElo: { type: "number", minimum: 0, maximum: 1000 },
			tags: schemasModels.tags,
			sortBy: { type: "string", enum: ["age", "distance", "elo", "tags"] },
			order: { type: "string", enum: ["asc", "desc"] },
		},
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const getUserById = {
	params: {
		type: "object",
		properties: {
			userId: schemasModels.id,
		},
		required: ["userId"],
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
			longitude: schemasModels.longitude,
			latitude: schemasModels.latitude,
			locationLabel: schemasModels.locationLabel,
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

export const deleteVote = {
	params: {
		type: "object",
		properties: {
			targetId: schemasModels.id,
		},
		required: ["targetId"],
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
			longitude: schemasModels.longitude,
			latitude: schemasModels.latitude,
			locationLabel: schemasModels.locationLabel,
		},
		required: [
			"birthDate",
			"gender",
			"sexualOrientation",
			"tags",
			"bio",
			"principalPicture",
		],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema

export const getChatConversation = {
	params: {
		type: "object",
		properties: {
			chatId: schemasModels.id,
		},
		required: ["chatId"],
		additionalProperties: false,
	},
} as const satisfies FastifyRouteSchema
