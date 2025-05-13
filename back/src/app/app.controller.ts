import { FastifyPluginAsync } from "fastify"
import appService from "@/app/app.service"
import * as schemas from "@/app/app.schemas"
import { InferSchema } from "@/types"
import appGuard from "./app.guard"
import { BadRequestException } from "@/lib/HttpException"

const appController: FastifyPluginAsync = async (app, options) => {
	const service = new appService(app, options)

	app.addHook("preHandler", appGuard)

	/* ============ Auth ============ */

	app.put<InferSchema<typeof schemas.complete>>(
		"/complete",
		{ schema: schemas.complete },
		async (request, reply) => {
			if (!request.isMultipart) throw new BadRequestException()

			const { completingSessionId, userId } = request
			const {
				birthDate,
				gender,
				sexualOrientation,
				bio,
				tags,
				principalPicture,
				secondaryPicture1,
				secondaryPicture2,
				secondaryPicture3,
				secondaryPicture4,
			} = request.body

			const sessionId = await service.complete(
				{
					id: userId,
					sessionId: completingSessionId,
					birthDate,
					gender,
					sexualOrientation,
					bio,
				},
				[
					principalPicture as unknown as Buffer,
					secondaryPicture1 as unknown as Buffer,
					secondaryPicture2 as unknown as Buffer,
					secondaryPicture3 as unknown as Buffer,
					secondaryPicture4 as unknown as Buffer,
				].filter(Boolean),
				JSON.parse(tags),
			)

			return reply
				.setCookie("sessionId", sessionId)
				.clearCookie("completingSessionId")
				.send()
		},
	)

	app.delete("/logout", async (request, reply) => {
		const { sessionId, completingSessionId, userId } = request

		await service.logout(sessionId, completingSessionId, userId)
		return reply
			.clearCookie("sessionId")
			.clearCookie("completingSessionId")
			.send()
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

	app.patch<InferSchema<typeof schemas.updateUser>>("/user", (request) => {
		const userId = request.userId
		const userData = request.body

		return service.updateUser(
			userId,
			{
				email: userData.email,
				username: userData.username,
				firstName: userData.firstName,
				lastName: userData.lastName,
				currentPassword: userData.currentPassword,
				newPassword: userData.newPassword,
				birthDate: userData.birthDate,
				gender: userData.gender,
				sexualOrientation: userData.sexualOrientation,
				bio: userData.bio,
			},
			userData.tags as unknown as number[],
		)
	})

	app.patch<InferSchema<typeof schemas.updateUserPictures>>(
		"/user/pictures",
		(request) => {
			const userId = request.userId
			const picturesData = request.body

			return service.updateUserPictures(
				userId,
				[
					picturesData.principalPicture as unknown as Buffer,
					picturesData.secondaryPicture1 as unknown as Buffer,
					picturesData.secondaryPicture2 as unknown as Buffer,
					picturesData.secondaryPicture3 as unknown as Buffer,
					picturesData.secondaryPicture4 as unknown as Buffer,
				].filter(Boolean),
			)
		},
	)

	/* ============ Chats ============ */

	app.get<InferSchema<typeof schemas.chatIdParam>>(
		"/chat/:chatId/conversation",
		{ schema: schemas.chatIdParam },
		(request) => {
			const userId = request.userId
			const { chatId } = request.params

			return service.getUserChatConversation(userId, chatId)
		},
	)

	/* ============ Tags ============ */
	app.get("/tags", () => {
		return service.getTags()
	})
}

export default appController
