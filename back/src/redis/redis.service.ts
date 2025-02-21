import { randomBytes, randomUUID } from "crypto"
import { FastifyInstance, FastifyPluginOptions } from "fastify"

class redisService {
	private redis

	private SESSION_DURATION = 3600 * 24 * 30
	private TOKEN_DURATION = 3600 * 24

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

	async createTempSession(
		userId: UserData["id"],
		defaultSessionId?: UserData["sessionId"],
	): Promise<NonNullable<UserData["sessionId"]>> {
		const tempSessionId = defaultSessionId ?? randomUUID()

		await this.redis.set(
			`tempSession:${tempSessionId}`,
			userId,
			"EX",
			this.SESSION_DURATION,
		)

		return tempSessionId
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
			this.TOKEN_DURATION,
		)

		return token
	}

	async getSession(sessionId: UserData["sessionId"]) {
		return this.redis.get(`session:${sessionId}`)
	}

	async getTempSession(tempSessionId: UserData["sessionId"]) {
		return this.redis.get(`tempSession:${tempSessionId}`)
	}

	async getActivationToken(token: string) {
		return this.redis.get(`activation:${token}`)
	}

	async deleteSession(sessionId: UserData["sessionId"]) {
		await this.redis.del(`session:${sessionId}`)
	}

	async deleteTempSession(tempSessionId: UserData["sessionId"]) {
		await this.redis.del(`tempSession:${tempSessionId}`)
	}

	async deleteAllSession(sessionId: UserData["sessionId"]) {
		await this.deleteSession(sessionId)
		await this.deleteTempSession(sessionId)
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
