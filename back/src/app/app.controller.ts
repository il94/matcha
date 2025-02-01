import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import { BadRequestException } from "@/lib/HttpException"

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

	app.post<{ Body: PostUserBody }>("/user", (request) => {
		const userData = request.body

		return service.createUser(userData)
	})

	app.get("/users", () => {
		return service.getUsers()
	})

	app.get("/tags", () => {
		return service.getTags()
	})
}

export default appController
