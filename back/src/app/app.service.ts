import { randomBytes, randomUUID } from "crypto"
import appRepository from "./app.repository"

import { FastifyInstance, FastifyPluginOptions } from "fastify"
import {
	BadRequestException,
	ForbiddenException,
	UnauthorizedException,
} from "@/lib/HttpException"
import bcrypt from "bcrypt"
import capitalize from "@/lib/capitalize"

class appService {
	private repository
	private db
	private redis
	private mailer

	private REDIS_SESSION_DURATION = 3600 * 24 * 30
	private REDIS_ACTIVATION_TOKEN_DURATION = 3600 * 24

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.repository = new appRepository(app, options)
		this.db = app.pg
		this.redis = app.redis
		this.mailer = app.mailer
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

		if (user.sessionId) await this.redis.del(`session:${user.sessionId}`)

		const sessionId = randomUUID()

		try {
			await this.redis.set(
				`session:${sessionId}`,
				user.id,
				"EX",
				this.REDIS_SESSION_DURATION,
			)
			await this.repository.updateUserSessionId(user.id, sessionId)

			return sessionId
		} catch (error) {
			await this.redis.del(`session:${sessionId}`)

			throw error
		}
	}

	async register(
		userData: Omit<
			UserData,
			"id" | "createdAt" | "sessionId" | "pictures" | "tags"
		>,
	) {
		if (await this.repository.getUserByEmail(userData.email))
			throw new ForbiddenException("EMAIL_ALREADY_TAKEN")

		if (await this.repository.getUserByUsername(userData.username))
			throw new ForbiddenException("USERNAME_ALREADY_TAKEN")

		const token = this.getRandomToken()

		let userId: UserData["id"]

		await this.db.transact(async (transact) => {
			try {
				userId = await this.repository.createUser(
					{
						...userData,
						password: await bcrypt.hash(userData.password, 10),
					},
					transact,
				)

				await this.redis.set(
					`activation:${token}`,
					userId,
					"EX",
					this.REDIS_ACTIVATION_TOKEN_DURATION,
				)

				await this.mailer.sendMail({
					to: userData.email,
					subject: "Activate Your Account",
					from: "Matcha <system.matcha@gmail.com>",
					html: this.getActivationTokenEmailTemplate(
						capitalize(userData.firstName),
						token,
					),
				})
			} catch (error) {
				await this.redis.del(`activation:${userId}`)
				throw error
			}
		})
	}

	async verify(sessionId?: UserData["sessionId"]): Promise<boolean> {
		if (!sessionId) throw new UnauthorizedException()

		const userId = await this.redis.get(`session:${sessionId}`)

		if (!userId) throw new UnauthorizedException()

		return true
	}

	async activate(token: string) {
		const userId = await this.redis.get(`activation:${token}`)

		if (!userId) throw new BadRequestException()

		const sessionId = randomUUID()

		await this.redis.set(
			`session:${sessionId}`,
			userId,
			"EX",
			this.REDIS_SESSION_DURATION,
		)
		await this.repository.activateUser(userId, sessionId)
		await this.redis.del(`activation:${token}`)

		return sessionId
	}

	/* ============= PRIVATE CONTROLLER ============= */

	async logout(
		sessionId: NonNullable<UserData["sessionId"]>,
		userId: UserData["id"],
	) {
		await this.repository.updateUserSessionId(userId, null)
		await this.redis.del(`session:${sessionId}`)
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

	/* ============ Utils ============ */

	getRandomToken(length = 32) {
		return randomBytes(length).toString("hex")
	}

	getActivationTokenEmailTemplate(
		firstname: UserData["firstName"],
		activationToken: string,
	) {
		const body = `
			<div class="container">
				<h1 class="title">Hi, ${firstname}</h1>
				<p>
					Welcome to Matcha, where exciting connections happen ! We're thrilled to have you on board.
				</p>
				<p>
					Before you dive into your Matcha experience, you'll need to activate your account. Let's get you started!
				</p>
				<p>
					<a class="button" href="${process.env.API_BACK_URL}/activate?token=${activationToken}">Activate Your Account</a>
				</p>
				<p class="footer">
					If this email wasn't meant for you, please feel free to ignore it.
				</p>
			</div>
		`

		return this.getEmailTemplate(body)
	}

	getEmailTemplate(body: string) {
		return `
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					p {
						font-size: 16px;
					}
					a {
						color: #007bff;
						text-decoration: none;
					}

					body {
						font-family: Arial, sans-serif;
						line-height: 1.6;
						background-color: #1f1f1f;
						color: #333;
						margin: 0;
						padding: 20px;
					}

					.container {
						width: 90%;
						height: 90%;
						max-width: 600px;
						margin: 20px auto;
						background: #fff;
						padding: 20px;
						border-radius: 8px;
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					}

					.title {
						color: #cda2ab;
					}

					.button {
						display: inline-block;
						background-color: #4ea268;
						color: white;
						padding: 10px 28px;
						border-radius: 5px;
						text-decoration: none;
						font-weight: 600;
					}

					.footer {
						margin-top: 20px;
						font-size: 14px;
						color: #666;
					}
				</style>
			</head>
			<body>
				${body}
			</body>
			</html>
		`
	}
}

export default appService
