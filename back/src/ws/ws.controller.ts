import appService from "@/app/app.service"
import { BadRequestException, HttpException } from "@/lib/HttpException"
import dayjs from "@/lib/dayjs"
import socketSend from "@/lib/socketSend"
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
		;(async () => {
			try {
				await service.updateUser(userId, { isOnline: true })
			} catch (error) {
				app.log.error(error, "WS: failed to set user online")
			}
		})()

		socket.on("message", async (raw) => {
			try {
				const message: SocketMessage = JSON.parse(raw.toString())

				if (message.type === "message") await onReceiveMessage(message)
				else if (message.type === "location")
					await onReceiveLocation(userId, message)
				else throw new BadRequestException("INVALID_SOCKET_MESSAGE_TYPE")
			} catch (error) {
				onError(error)
			}
		})

		const onReceiveMessage = async (message: SocketMessage) => {
			if (!message.content || !message.chatId)
				throw new BadRequestException("INVALID_SOCKET_MESSAGE")

			const response = await service.createMessage(
				userId,
				message.chatId,
				message.content,
			)

			const receiverSocket = app.clients.get(response.receiverId)

			if (receiverSocket) {
				const author = await service.getUser(userId)

				socketSend(receiverSocket, "message", {
					authorId: response.message.authorId,
					chatId: response.message.chatId,
					createdAt: response.message.createdAt,
					content: response.message.content,
					authorUsername: author.username,
					authorFirstName: author.firstName,
					authorAvatar: author.principalPicture?.name,
				})
			}
		}

		const onReceiveLocation = async (
			userId: UserData["id"],
			location: SocketMessage,
		) => {
			if (
				typeof location.latitude !== "number" ||
				typeof location.longitude !== "number"
			)
				throw new BadRequestException("INVALID_SOCKET_MESSAGE")

			const user = await service.getUser(userId)

			if (user.locationSource !== "manual") {
				await service.updateUser(userId, {
					longitude: location.longitude,
					latitude: location.latitude,
				})
			}

			socketSend(socket, "location")
		}

		socket.onclose = async () => {
			app.clients.delete(userId)

			try {
				await service.updateUser(userId, {
					isOnline: false,
					lastConnexion: dayjs().utc().toISOString(),
				})
			} catch (error) {
				app.log.error(error, "WS: failed to set user offline")
			}
		}

		const onError = (error?: unknown) => {
			if (error instanceof HttpException) {
				app.log.error(
					print(
						RED,
						`(${request.socket.remoteAddress}) WS ${error.code}\n\t${error.message}`,
					),
				)

				socketSend(socket, "error", {
					message: error.message,
				})
			} else {
				app.log.error(
					print(
						RED,
						`(${request.socket.remoteAddress}) WS ${500}\n\t${"UNKNOWN_ERROR"}`,
					),
				)

				socketSend(socket, "error", {
					message: "UNKNOWN_ERROR",
				})
			}
		}
	})
}

export default wsController
