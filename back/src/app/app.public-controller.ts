import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import { BadRequestException } from "@/lib/HttpException"
import * as schemas from "@/app/app.schemas"
import { InferSchema } from "@/types"

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
				.setCookie(isCompleting ? "tempSessionId" : "sessionId", sessionId)
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

	app.get("/verify", async (request) => {
		const { sessionId, tempSessionId } = request.cookies

		return service.verify(sessionId, tempSessionId)
	})

	app.get<InferSchema<typeof schemas.activate>>(
		"/activate",
		{ schema: schemas.activate },
		async (request, reply) => {
			const { token } = request.query

			const sessionId = await service.activate(token)

			return reply
				.setCookie("tempSessionId", sessionId)
				.redirect(process.env.API_FRONT_URL!)
				.send()
		},
	)
}

export default appPublicController
