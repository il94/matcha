import appService from "@/app/app.service"
import * as schemas from "@/app/app.schemas"
import { UnauthorizedException } from "@/lib/HttpException"
import { FastifyPluginAsyncJsonSchemaToTs } from "@fastify/type-provider-json-schema-to-ts"

const appPublicController: FastifyPluginAsyncJsonSchemaToTs = async (
	app,
	options,
) => {
	const service = new appService(app, options)

	// app.addHook("preValidation", async (request, reply) => {
	// 	switch (request.method) {
	// 		case "POST":
	// 			if (!request.body || !Object.keys(request.body).length) {
	// 				throw new BadRequestException("MISSING_BODY")
	// 			}
	// 	}
	// })

	app.post(
		"/login",
		{
			schema: schemas.login,
			config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
		},
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

	app.post(
		"/register",
		{
			schema: schemas.register,
			config: { rateLimit: { max: 5, timeWindow: "10 minutes" } },
		},
		async (request) => {
			const userData = request.body

			return service.register(userData)
		},
	)

	app.post(
		"/forgot",
		{
			schema: schemas.forgot,
			config: { rateLimit: { max: 3, timeWindow: "5 minutes" } },
		},
		async (request) => {
			const { email } = request.body

			return service.forgot(email)
		},
	)

	app.get("/verify", { config: { rateLimit: false } }, async (request) => {
		const { sessionId, completingSessionId, resetingSessionId } =
			request.cookies

		const result = await service.verify(
			sessionId,
			completingSessionId,
			resetingSessionId,
		)

		return result
	})

	app.get(
		"/activate",
		{
			schema: schemas.activate,
			config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
		},
		async (request, reply) => {
			const { token } = request.query

			const sessionId = await service.activate(token)

			return reply
				.setCookie("completingSessionId", sessionId)
				.redirect(process.env.API_FRONT_URL!)
				.send()
		},
	)

	app.get(
		"/reset",
		{
			schema: schemas.reset,
			config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
		},
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

	app.patch(
		"/reset-password",
		{
			schema: schemas.resetPassword,
			config: { rateLimit: { max: 5, timeWindow: "10 minutes" } },
		},
		async (request, reply) => {
			const { resetingSessionId } = request.cookies
			const { password } = request.body

			if (!resetingSessionId) throw new UnauthorizedException()

			await service.resetPassword(resetingSessionId, password)

			return reply.clearCookie("resetingSessionId").send()
		},
	)

	app.get(
		"/change-email",
		{
			schema: schemas.changeEmail,
			config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
		},
		async (request, reply) => {
			const { token } = request.query

			await service.changeEmail(token)
			return reply
				.redirect(
					`${process.env.API_FRONT_URL!}/settings?success=EMAIL_UPDATED`,
				)
				.send()
		},
	)

	app.delete(
		"/public-logout",
		{ config: { rateLimit: { max: 20, timeWindow: "1 minute" } } },
		async (request, reply) => {
			const { resetingSessionId } = request.cookies

			await service.publicLogout(resetingSessionId)
			return reply.clearCookie("resetingSessionId").send()
		},
	)
}

export default appPublicController
