import { randomBytes, randomUUID } from "crypto"
import { FastifyInstance, FastifyPluginOptions } from "fastify"

class redisService {
	private redis

	private SESSION_DURATION = 3600 * 24 * 30
	private TOKEN_DURATION = 3600 * 24
	private RESETING_SESSION_DURATION = 900
	private RESET_TOKEN_DURATION = 900

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.redis = app.redis
	}

	async createSession(
		userId: UserData["id"],
		defaultSessionId?: UserData["sessionId"],
	): Promise<UserData["sessionId"]> {
		const sessionId = defaultSessionId ?? randomUUID()

		await this.redis.set(
			`session:${sessionId}`,
			userId,
			"EX",
			this.SESSION_DURATION,
		)

		return sessionId
	}

	async createCompletingSession(
		userId: UserData["id"],
		defaultSessionId?: UserData["sessionId"],
	): Promise<NonNullable<UserData["sessionId"]>> {
		const completingSessionId = defaultSessionId ?? randomUUID()

		await this.redis.set(
			`completingSession:${completingSessionId}`,
			userId,
			"EX",
			this.SESSION_DURATION,
		)

		return completingSessionId
	}

	async createResetingSession(
		userId: UserData["id"],
		defaultSessionId?: UserData["sessionId"],
	): Promise<NonNullable<UserData["sessionId"]>> {
		const sessionId = defaultSessionId ?? randomUUID()

		await this.redis.set(
			`resetingSession:${sessionId}`,
			userId,
			"EX",
			this.RESETING_SESSION_DURATION,
		)

		return sessionId
	}

	async createActivationToken(userId: UserData["id"], defaultToken?: string) {
		const token = defaultToken ?? this.getRandomToken()

		await this.redis.set(
			`activation:${token}`,
			userId,
			"EX",
			this.TOKEN_DURATION,
		)

		return token
	}

	async createResetPasswordToken(
		userId: UserData["id"],
		defaultToken?: string,
	) {
		const token = defaultToken ?? this.getRandomToken()

		await this.redis.set(
			`resetPassword:${token}`,
			userId,
			"EX",
			this.RESET_TOKEN_DURATION,
		)

		return token
	}

	async getSession(sessionId: UserData["sessionId"]) {
		return this.redis.get(`session:${sessionId}`)
	}

	async getCompletingSession(sessionId: UserData["sessionId"]) {
		return this.redis.get(`completingSession:${sessionId}`)
	}

	async getResetingSession(sessionId: UserData["sessionId"]) {
		return this.redis.get(`resetingSession:${sessionId}`)
	}

	async getActivationToken(token: string) {
		return this.redis.get(`activation:${token}`)
	}

	async getResetPasswordToken(token: string) {
		return this.redis.get(`resetPassword:${token}`)
	}

	async deleteSession(sessionId: UserData["sessionId"]) {
		await this.redis.del(`session:${sessionId}`)
	}

	async deleteCompletingSession(sessionId: UserData["sessionId"]) {
		await this.redis.del(`completingSession:${sessionId}`)
	}

	async deleteResetingSession(sessionId: UserData["sessionId"]) {
		await this.redis.del(`resetingSession:${sessionId}`)
	}

	async deleteAllSession(sessionId: UserData["sessionId"]) {
		await this.deleteSession(sessionId)
		await this.deleteCompletingSession(sessionId)
	}

	async deleteActivationToken(token: string) {
		await this.redis.del(`activation:${token}`)
	}

	async deleteResetPasswordToken(token: string) {
		await this.redis.del(`resetPassword:${token}`)
	}

	/* ============ Utils ============ */

	getRandomToken(length = 32) {
		return randomBytes(length).toString("hex")
	}
}
export default redisService
