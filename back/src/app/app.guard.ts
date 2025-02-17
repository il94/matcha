import { preHandlerAsyncHookHandler } from "fastify"
import { UnauthorizedException } from "../lib/HttpException"

const appGuard: preHandlerAsyncHookHandler = async (request, reply) => {
	const sessionId = request.cookies.sessionId

	if (!sessionId) throw new UnauthorizedException()

	const userId = await request.server.redis.get(`session:${sessionId}`)

	if (!userId) throw new UnauthorizedException()

	request.sessionId = sessionId
	request.userId = userId
}

export default appGuard
