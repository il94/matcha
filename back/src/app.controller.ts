import { FastifyPluginAsync } from "fastify"
import appService from "./app.service"

const appController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	app.get("/", async (request, reply) => {
		console.log("Hello !")

		return { hello: "world" }
	})
}

export default appController
