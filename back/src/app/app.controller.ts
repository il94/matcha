import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import * as schemas from "@/app/app.schemas"
import { InferSchema } from "@/types"
import appGuard from "./app.guard"

const appController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	app.addHook("preHandler", appGuard)

	/* ============ Auth ============ */

	app.delete("/logout", async (request, reply) => {
		const { sessionId, userId } = request

		await service.logout(sessionId, userId)
		return reply.clearCookie("sessionId").send()
	})

	/* ============ Users ============ */

	app.get<InferSchema<typeof schemas.getUsers>>(
		"/users",
		{ schema: schemas.getUsers },
		(request) => {
			const { page, limit } = request.query

			return service.getUsers(page, limit)
		},
	)

	app.get("/user/me", (request) => {
		const userId = request.userId

		return service.getUser(userId)
	})

	app.get("/user/chats", (request) => {
		const userId = request.userId

		return service.getUserChats(userId)
	})

	app.get<InferSchema<typeof schemas.chatIdParam>>(
		"/chat/:chatId/conversation",
		{ schema: schemas.chatIdParam },
		(request) => {
			const userId = request.userId
			const { chatId } = request.params

			return service.getUserChatConversation(userId, chatId)
		},
	)

	app.get("/tags", () => {
		return service.getTags()
	})
}

export default appController
