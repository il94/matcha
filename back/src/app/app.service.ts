import { randomUUID } from "crypto"
import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { ForbiddenException, UnauthorizedException } from "@/lib/HttpException"
import bcrypt from "bcrypt"

class appService {
	private repository
	private db
	private redis

	private REDIS_SESSION_DURATION = 3600 * 24 * 30

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
		this.db = app.pg
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

		try {
			await this.redis.set(
				sessionId,
				user.id,
				"EX",
				this.REDIS_SESSION_DURATION,
			)
			await this.repository.updateUserSessionId(user.id, sessionId)

			return sessionId
		} catch (error) {
			await this.redis.del(sessionId)

			throw error
		}
	}

	async register(
		userData: Omit<
			UserData,
			"id" | "createdAt" | "sessionId" | "pictures" | "tags"
		>,
	): Promise<NonNullable<UserData["sessionId"]>> {
		if (await this.repository.getUserByEmail(userData.email))
			throw new ForbiddenException("EMAIL_ALREADY_TAKEN")

		if (await this.repository.getUserByUsername(userData.username))
			throw new ForbiddenException("USERNAME_ALREADY_TAKEN")

		const sessionId = randomUUID()

		return this.db.transact(async (transact) => {
			try {
				const userId = await this.repository.createUser(
					{
						...userData,
						password: await bcrypt.hash(userData.password, 10),
					},
					transact,
				)

				await this.redis.set(
					sessionId,
					userId,
					"EX",
					this.REDIS_SESSION_DURATION,
				)
				await this.repository.updateUserSessionId(userId, sessionId, transact)

				return sessionId
			} catch (error) {
				await this.redis.del(sessionId)
				throw error
			}
		})
	}

	async verify(sessionId?: UserData["sessionId"]): Promise<boolean> {
		if (!sessionId) throw new UnauthorizedException()

		const userId = await this.redis.get(sessionId)

		if (!userId) throw new UnauthorizedException()

		return true
	}

	/* ============= PRIVATE CONTROLLER ============= */

	async logout(
		sessionId: NonNullable<UserData["sessionId"]>,
		userId: UserData["id"],
	) {
		await this.repository.updateUserSessionId(userId, null)
		await this.redis.del(sessionId)
	}

	/* ============ Users ============ */

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
