import fastifyRedis from "@fastify/redis"
import { FastifyPluginAsync } from "fastify"

const redisPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyRedis, { host: process.env.REDIS_HOST })
}

export default redisPlugin
