import fastifyRedis from "@fastify/redis"
import { FastifyPluginAsync } from "fastify"

const redisPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyRedis, { host: process.env.REDIS_HOST })

	// app.addHook("onReady", async () => {
	// 	console.log("READY")
	// 	// app.redis.
	// })
}

export default redisPlugin
