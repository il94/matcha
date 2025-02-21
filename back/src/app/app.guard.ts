import { preHandlerAsyncHookHandler } from "fastify"
import { UnauthorizedException } from "../lib/HttpException"

const appGuard: preHandlerAsyncHookHandler = async (request, reply) => {
	const { sessionId, tempSessionId } = request.cookies

	let userId

	if (sessionId) {
		userId = await request.server.redis.get(`session:${sessionId}`)

		if (!userId) throw new UnauthorizedException()

		request.sessionId = sessionId
	} else if (tempSessionId) {
		userId = await request.server.redis.get(`tempSession:${tempSessionId}`)

		if (!userId) throw new UnauthorizedException()

		request.tempSessionId = tempSessionId
	} else throw new UnauthorizedException()

	request.userId = userId
}

export default appGuard
