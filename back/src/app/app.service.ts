import { randomUUID } from "crypto"
import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { NotFoundException, UnauthorizedException } from "@/lib/HttpException"
import bcrypt from "bcrypt"

class appService {
	private repository
	private redis

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
		this.redis = app.redis
	}

	/* ============= PUBLIC CONTROLLER ============= */

	async login(username: UserData["username"], password: string) {
		const user = await this.repository.getUserByUsername(username)

		if (!user) throw new NotFoundException()

		if (!(await bcrypt.compare(password, user.password)))
			throw new UnauthorizedException()

		const sessionId = randomUUID()
		const created = await this.redis.set(sessionId, user.id, "EX", 3600) // TODO checker les cas d'erreur

		await this.repository.updateUserSessionId(user.id, sessionId)

		return user
	}

	/* ============= PRIVATE CONTROLLER ============= */

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

	getUserChat(userId: UserData["id"], chatId: ChatData["id"]) {
		return this.repository.getUserChat(userId, chatId)
	}

	getChatMessages(chatId: ChatData["id"]) {
		return this.repository.getChatMessages(chatId)
	}

	getTags() {
		return this.repository.getTags()
	}
}

export default appService
