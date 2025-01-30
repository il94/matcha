import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import { BadRequestException, HttpException } from "@/lib/HttpException"
import { postUserSchema } from "./schemas/postUserSchema"

const appController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	app.addHook("preValidation", async (request, reply) => {
		switch (request.method) {
			case "POST":
				if (!request.body || !Object.keys(request.body).length) {
					throw new BadRequestException("MISSING_BODY")
				}
		}
	})

	app.post<{ Body: PostUserBody }>("/user", postUserSchema, (request) => {
		const userData = request.body

		return service.createUser(userData)
	})

	app.get("/users", () => {
		return service.getUsers()
	})
}

export default appController
