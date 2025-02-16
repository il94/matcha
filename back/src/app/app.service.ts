import { randomUUID } from "crypto"
import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	ForbiddenException,
	UnauthorizedException,
} from "@/lib/HttpException"
import bcrypt from "bcrypt"

class appService {
	private repository
	private redis

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
		this.redis = app.redis
	}

	/* ============= PUBLIC CONTROLLER ============= */

	async login(
		username: UserData["username"],
		password: string,
	): Promise<NonNullable<UserData["sessionId"]>> {
		const user = await this.repository.getUserByUsername(username)

		if (!user) throw new ForbiddenException()

		if (!(await bcrypt.compare(password, user.password)))
			throw new ForbiddenException()

		if (user.sessionId) await this.redis.del(user.sessionId)

		const sessionId = randomUUID()
		await this.redis.set(sessionId, user.id, "EX", 3600)
		await this.repository.updateUserSessionId(user.id, sessionId)

		return sessionId
	}

	async verify(sessionId?: UserData["sessionId"]): Promise<boolean> {
		if (!sessionId) throw new UnauthorizedException()

		const userId = await this.redis.get(sessionId)

		if (!userId) throw new UnauthorizedException()

		return true
	}

	/* ============= PRIVATE CONTROLLER ============= */

	/* ============ Users ============ */

	async createUser(
		userData: Omit<UserData, "id" | "createdAt" | "pictures" | "tags">,
	) {
		await this.repository.createUser(userData)
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

	getUserChatConversation(userId: UserData["id"], chatId: ChatData["id"]) {
		return this.repository.getUserChatConversation(userId, chatId)
	}

	getTags() {
		return this.repository.getTags()
	}
}

export default appService
