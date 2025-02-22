import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import * as schemas from "@/app/app.schemas"
import { InferSchema } from "@/types"
import { UnauthorizedException } from "@/lib/HttpException"

const appPublicController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	// app.addHook("preValidation", async (request, reply) => {
	// 	switch (request.method) {
	// 		case "POST":
	// 			if (!request.body || !Object.keys(request.body).length) {
	// 				throw new BadRequestException("MISSING_BODY")
	// 			}
	// 	}
	// })

	app.post<InferSchema<typeof schemas.login>>(
		"/login",
		{ schema: schemas.login },
		async (request, reply) => {
			const { username, password } = request.body

			const { sessionId, isCompleting } = await service.login(
				username,
				password,
			)

			return reply
				.setCookie(
					isCompleting ? "completingSessionId" : "sessionId",
					sessionId,
				)
				.send()
		},
	)

	app.post<InferSchema<typeof schemas.register>>(
		"/register",
		{ schema: schemas.register },
		async (request) => {
			const userData = request.body

			return service.register(userData)
		},
	)

	app.post<InferSchema<typeof schemas.forgot>>(
		"/forgot",
		{ schema: schemas.forgot },
		async (request) => {
			const { email } = request.body

			return service.forgot(email)
		},
	)

	app.get("/verify", async (request) => {
		const { sessionId, completingSessionId, resetingSessionId } =
			request.cookies

		const result = await service.verify(
			sessionId,
			completingSessionId,
			resetingSessionId,
		)

		return result
	})

	app.get<InferSchema<typeof schemas.activate>>(
		"/activate",
		{ schema: schemas.activate },
		async (request, reply) => {
			const { token } = request.query

			const sessionId = await service.activate(token)

			return reply
				.setCookie("completingSessionId", sessionId)
				.redirect(process.env.API_FRONT_URL!)
				.send()
		},
	)

	app.get<InferSchema<typeof schemas.reset>>(
		"/reset",
		{ schema: schemas.reset },
		async (request, reply) => {
			const { token } = request.query

			const sessionId = await service.reset(token)

			return reply
				.setCookie("resetingSessionId", sessionId, {
					maxAge: parseInt(process.env.COOKIE_RESET_MAX_AGE!),
				})
				.redirect(process.env.API_FRONT_URL!)
				.send()
		},
	)

	app.patch<InferSchema<typeof schemas.resetPassword>>(
		"/reset-password",
		{ schema: schemas.resetPassword },
		async (request, reply) => {
			const { resetingSessionId } = request.cookies
			const { password } = request.body

			if (!resetingSessionId) throw new UnauthorizedException()

			await service.resetPassword(resetingSessionId, password)

			return reply.clearCookie("resetingSessionId").send()
		},
	)

	app.delete("/public-logout", async (request, reply) => {
		const { resetingSessionId } = request.cookies

		await service.publicLogout(resetingSessionId)
		return reply.clearCookie("resetingSessionId").send()
	})
}

export default appPublicController
