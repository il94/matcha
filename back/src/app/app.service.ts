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

	getUser(userId: UserData["id"]) {
		return this.repository.getUser(userId)
	}

	getUserChats(userId: UserData["id"]) {
		return this.repository.getUserChats(userId)
	}

	getChatMessages(chatId: ChatData["id"]) {
		return this.repository.getChatMessages(chatId)
	}

	getTags() {
		return this.repository.getTags()
	}
}

export default appService
