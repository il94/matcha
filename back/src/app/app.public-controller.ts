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

			const sessionId = await service.login(username, password)

			return reply
				.setCookie("sessionId", sessionId, {
					httpOnly: true,
					sameSite: "none",
					maxAge: 3600,
					secure: true,
				})
				.send({ message: "Login successful" })
		},
	)

	app.get("/verify", async (request, reply) => {
		return await service.verify(request.cookies.sessionId)
	})
}

export default appPublicController
