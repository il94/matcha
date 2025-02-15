import { FastifyRouteSchema } from "@/fastify.types"

export const stringIdParam = (param: string) =>
	({
		params: {
			type: "object",
			properties: {
				[param]: { type: "string" },
			},
			required: [param],
		},
	}) as const satisfies FastifyRouteSchema

export const numberIdParam = (param: string) =>
	({
		params: {
			type: "object",
			properties: {
				[param]: { type: "number" },
			},
			required: [param],
		},
	}) as const satisfies FastifyRouteSchema
