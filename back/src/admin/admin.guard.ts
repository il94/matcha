import { createHash, timingSafeEqual } from "crypto"
import { preHandlerAsyncHookHandler } from "fastify"
import { UnauthorizedException } from "../lib/HttpException"

const adminGuard: preHandlerAsyncHookHandler = async (request) => {
	const expectedToken = process.env.ADMIN_TOKEN
	const providedToken = request.headers["x-admin-token"]

	if (!expectedToken || typeof providedToken !== "string") {
		throw new UnauthorizedException()
	}

	const expectedHash = createHash("sha256").update(expectedToken).digest()
	const providedHash = createHash("sha256").update(providedToken).digest()

	if (!timingSafeEqual(expectedHash, providedHash)) {
		throw new UnauthorizedException()
	}
}

export default adminGuard
