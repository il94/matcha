import { FastifyPluginAsync } from "fastify"
import appController from "./app.controller"

const appPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(appController)
}

export default appPlugin
