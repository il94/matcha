import fastifyRateLimit from "@fastify/rate-limit"
import { FastifyPluginAsync } from "fastify"
import { TooManyRequestsException } from "@/lib/HttpException"

const rateLimitPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyRateLimit, {
		redis: app.redis,
		max: 1000,
		timeWindow: "1 minute",
		errorResponseBuilder: (_req, context) =>
			new TooManyRequestsException(Math.ceil(context.ttl / 1000)),
	})
}

export default rateLimitPlugin
