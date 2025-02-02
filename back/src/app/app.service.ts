import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"

class appService {
	private repository

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
	}

	createUser(userData: Omit<UserData, "id" | "createdAt">) {
		this.repository.createUser(userData)
	}

	getUsers(page: number, limit: number) {
		return this.repository.getUsers(page, limit)
	}

	getTags() {
		return this.repository.getTags()
	}
}

export default appService
