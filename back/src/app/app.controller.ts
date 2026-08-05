import appService from "@/app/app.service"
import * as schemas from "@/app/app.schemas"
import appGuard from "./app.guard"
import appDemoGuard from "./app.demo-guard"
import { BadRequestException } from "@/lib/HttpException"
import wsController from "@/ws/ws.controller"
import { FastifyPluginAsyncJsonSchemaToTs } from "@fastify/type-provider-json-schema-to-ts"

const appController: FastifyPluginAsyncJsonSchemaToTs = async (
	app,
	options,
) => {
	const service = new appService(app, options)

	app.addHook("preHandler", appGuard)
	app.addHook("preHandler", appDemoGuard)

	app.register(wsController)

	/* ============ Auth ============ */

	app.get(
		"/location",
		{ schema: schemas.getLocationByCoordinates },
		(request, reply) => {
			const { latitude, longitude } = request.query

			return service.getLocationByCoordinates(latitude, longitude)
		},
	)

	app.get(
		"/location/search",
		{ schema: schemas.getLocationSuggestions },
		(request, reply) => {
			const { label } = request.query

			return service.getLocationSuggestions(label)
		},
	)

	app.put("/complete", { schema: schemas.complete }, async (request, reply) => {
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
			longitude,
			latitude,
			locationLabel,
		} = request.body

		const sessionId = await service.complete(
			{
				id: userId,
				sessionId: completingSessionId,
				birthDate,
				gender,
				sexualOrientation,
				bio,
				longitude,
				latitude,
				locationLabel,
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
	})

	app.delete("/logout", async (request, reply) => {
		const { sessionId, completingSessionId, userId } = request

		await service.logout(sessionId, completingSessionId, userId)
		const clients = app.clients.get(userId)
		if (clients) {
			for (const client of clients) client.close()
			app.clients.delete(userId)
		}

		return reply
			.clearCookie("sessionId")
			.clearCookie("completingSessionId")
			.send()
	})

	/* ============ Users ============ */

	app.post("/user/vote", { schema: schemas.createVote }, (request) => {
		const userId = request.userId
		const { targetId, vote } = request.body

		return service.createVote(userId, targetId, vote)
	})

	app.post("/user/block", { schema: schemas.createBlock }, (request) => {
		const userId = request.userId
		const { targetId } = request.body

		return service.createBlock(userId, targetId)
	})

	app.post("/user/report", { schema: schemas.createReport }, (request) => {
		const userId = request.userId
		const { targetId, reason } = request.body

		return service.createReport(userId, targetId, reason)
	})

	app.get("/users", { schema: schemas.getUsers }, (request) => {
		const userId = request.userId
		const {
			limit,
			minAge,
			maxAge,
			maxDistance,
			minElo,
			maxElo,
			tags,
			sortBy,
			order,
		} = request.query

		return service.getUsers(userId, limit, {
			minAge,
			maxAge,
			maxDistance,
			minElo,
			maxElo,
			tags: tags ? (JSON.parse(tags) as number[]) : undefined,
			sortBy,
			order,
		})
	})

	app.get("/user", (request) => {
		const userId = request.userId

		return service.getUser(userId)
	})

	app.get("/user/:userId", { schema: schemas.getUserById }, (request) => {
		const userId = request.userId
		const targetId = request.params.userId

		return service.getUser(userId, targetId)
	})

	app.get("/user/chats", (request) => {
		const userId = request.userId

		return service.getUserChats(userId)
	})

	app.get("/user/views", (request) => {
		const userId = request.userId

		return service.getUserViews(userId)
	})

	app.get("/user/likes", (request) => {
		const userId = request.userId

		return service.getUserLikes(userId)
	})

	app.get("/user/notifications", (request) => {
		const userId = request.userId

		return service.getUserNotifications(userId)
	})

	app.patch("/user/notifications/read", (request) => {
		const userId = request.userId

		return service.markNotificationsRead(userId)
	})

	app.patch("/user", { schema: schemas.updateUser }, (request) => {
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
				longitude: userData.longitude,
				latitude: userData.latitude,
				locationLabel: userData.locationLabel,
				gender: userData.gender,
				sexualOrientation: userData.sexualOrientation,
				bio: userData.bio,
			},
			userData.tags ? (JSON.parse(userData.tags) as number[]) : undefined,
		)
	})

	app.patch(
		"/user/pictures",
		{ schema: schemas.updateUserPictures },
		(request) => {
			if (!request.isMultipart) throw new BadRequestException()

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

	app.delete(
		"/user/vote/:targetId",
		{ schema: schemas.deleteVote },
		(request) => {
			const userId = request.userId
			const { targetId } = request.params

			return service.deleteVote(userId, targetId)
		},
	)

	/* ============ Chats ============ */

	app.get(
		"/chat/:chatId/conversation",
		{ schema: schemas.getChatConversation },
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
