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

	app.post<InferSchema<typeof schemas.loginSchema>>(
		"/login",
		{ schema: schemas.loginSchema },
		async (request) => {
			const { username, password } = request.body

			return service.login(username, password)
		},
	)
}

export default appPublicController
