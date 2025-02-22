import { preHandlerAsyncHookHandler } from "fastify"
import { UnauthorizedException } from "../lib/HttpException"

const appGuard: preHandlerAsyncHookHandler = async (request, reply) => {
	const { sessionId, completingSessionId } = request.cookies

	let userId

	if (sessionId) {
		userId = await request.server.redis.get(`session:${sessionId}`)

		if (!userId) throw new UnauthorizedException()

		request.sessionId = sessionId
	} else if (completingSessionId) {
		userId = await request.server.redis.get(
			`completingSession:${completingSessionId}`,
		)

		if (!userId) throw new UnauthorizedException()

		request.completingSessionId = completingSessionId
	} else throw new UnauthorizedException()

	request.userId = userId
}

export default appGuard
