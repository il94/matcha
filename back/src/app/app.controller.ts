import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import { BadRequestException } from "@/lib/HttpException"

const appController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	app.addHook("preValidation", async (request, reply) => {
		switch (request.method) {
			case "POST":
				if (!request.body || !Object.keys(request.body).length) {
					throw new BadRequestException("MISSING_BODY")
				}
		}
	})

	app.post<{ Body: PostUserBody }>("/user", (request) => {
		const userData = request.body

		return service.createUser(userData)
	})

	const getUsersSchema = {
		schema: {
			querystring: {
				type: "object",
				properties: {
					page: { type: "number", default: 1 },
					limit: { type: "number", default: 5 },
				},
			},
		},
	}

	app.get<{ Querystring: GetUsersQuery }>(
		"/users",
		getUsersSchema,
		(request) => {
			const { page, limit } = request.query

			return service.getUsers(page, limit)
		},
	)

	app.get<{ Params: { userId: UserData["id"] } }>(
		"/user/:userId",
		(request) => {
			const { userId } = request.params

			return service.getUser(userId)
		},
	)

	app.get("/user/me", () => {
		const userId = process.env.VITE_USER_ID_TEST as string

		return service.getUser(userId)
	})

	app.get("/chats", () => {
		const userId = process.env.VITE_USER_ID_TEST as string

		return service.getUserChats(userId)
	})

	app.get<{ Params: { chatId: ChatData["id"] } }>(
		"/chat/:chatId",
		(request) => {
			const userId = process.env.VITE_USER_ID_TEST as string
			const { chatId } = request.params

			return service.getUserChat(userId, chatId)
		},
	)

	app.get<{ Params: { chatId: ChatData["id"] } }>(
		"/chat/:chatId/messages",
		(request) => {
			const { chatId } = request.params

			return service.getChatMessages(chatId)
		},
	)

	app.get("/tags", () => {
		return service.getTags()
	})
}

export default appController
