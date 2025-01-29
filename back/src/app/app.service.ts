import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"

class appService {
	private repository

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
	}

	async createUser(userData: Omit<UserData, "id" | "createdAt">) {
		await this.repository.createUser(userData)
	}
}

export default appService
