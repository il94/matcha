import { preHandlerAsyncHookHandler } from "fastify"
import { ForbiddenException } from "@/lib/HttpException"
import { ERROR_CODES } from "@/lib/errorCodes"
import { isDemoUser } from "./demo"

const appDemoGuard: preHandlerAsyncHookHandler = async (request) => {
	if (request.method === "GET") return
	if (request.routeOptions.url === "/logout") return

	if (await isDemoUser(request.server, request.userId))
		throw new ForbiddenException(ERROR_CODES.DEMO_READ_ONLY)
}

export default appDemoGuard
