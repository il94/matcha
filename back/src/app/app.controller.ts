import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import * as schemas from "@/app/app.schemas"
import { InferSchema } from "@/types"
import appGuard from "./app.guard"

const appController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	app.addHook("preHandler", appGuard)

	/* ============ Users ============ */

	app.post<InferSchema<typeof schemas.postUser>>(
		"/user",
		{ schema: schemas.postUser },
		(request) => {
			const userData = request.body

			return service.createUser(userData)
		},
	)

	app.get<InferSchema<typeof schemas.getUsers>>(
		"/users",
		{ schema: schemas.getUsers },
		(request) => {
			const { page, limit } = request.query

			return service.getUsers(page, limit)
		},
	)

	// app.get<InferSchema<typeof schemas.userIdParam>>(
	// 	"/user/:userId",
	// 	{ schema: schemas.userIdParam },
	// 	(request) => {
	// 		const { userId } = request.params

	// 		return service.getUser(userId)
	// 	},
	// )

	app.get("/user/me", () => {
		// TODO Recup l'id par l'auth
		const userId = process.env.VITE_USER_ID_TEST as string

		return service.getUser(userId)
	})

	app.get("/user/chats", () => {
		// TODO Recup l'id par l'auth
		const userId = process.env.VITE_USER_ID_TEST as string

		return service.getUserChats(userId)
	})

	app.get<InferSchema<typeof schemas.chatIdParam>>(
		"/chat/:chatId/conversation",
		{ schema: schemas.chatIdParam },
		(request) => {
			// TODO Recup l'id par l'auth
			const userId = process.env.VITE_USER_ID_TEST as string
			const { chatId } = request.params

			return service.getUserChatConversation(userId, chatId)
		},
	)

	app.get("/tags", () => {
		return service.getTags()
	})
}

export default appController
