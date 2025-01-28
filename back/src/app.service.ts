import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"

class appService {
	private repository

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
	}
}

export default appService
