import appService from "@/app/app.service"
import { HttpException } from "@/lib/HttpException"
import { FastifyPluginAsync } from "fastify"

const RED = "\x1b[31m"

const END = "\x1b[0m"

const print = (color: string, message: string) => {
	return `${color}${message}${END}`
}

const wsController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	app.get("/", { websocket: true }, (socket, request) => {
		const { userId } = request

		app.clients.set(userId, socket)

		socket.on("message", async (raw) => {
			try {
				const message: SocketMessage = JSON.parse(raw.toString())

				if (!message.content || !message.chatId) return

				const response = await service.createMessage(
					userId,
					message.chatId,
					message.content,
				)

				const receiverSocket = app.clients.get(response.receiverId)

				if (receiverSocket) {
					receiverSocket.send(
						JSON.stringify({
							type: "message",
							authorId: response.message.authorId,
							chatId: response.message.chatId,
							createdAt: response.message.createdAt,
							content: response.message.content,
						}),
					)
				}
			} catch (error) {
				if (error instanceof HttpException) {
					app.log.error(
						print(
							RED,
							`(${request.socket.remoteAddress}) WS ${error.code}\n\t${error.message}`,
						),
					)

					socket.send(
						JSON.stringify({
							type: "error",
							message: error.message,
						}),
					)
				} else {
					app.log.error(
						print(
							RED,
							`(${request.socket.remoteAddress}) WS ${500}\n\t${"UNKOWN_ERROR"}`,
						),
					)

					socket.send(
						JSON.stringify({
							type: "error",
							message: "UNKNOWN_ERROR",
						}),
					)
				}
			}
		})
	})
}

export default wsController
