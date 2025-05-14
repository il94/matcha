import { FastifyPluginAsync } from "fastify"
import adminRepository from "./admin.repository"

const adminController: FastifyPluginAsync = async (app, options) => {
	const repository = new adminRepository(app, options)

	app.post("/", async () => {
		await repository.fillDb()

		return "Db created"
	})

	app.post("/chats", async () => {
		await repository.createChats()

		return "Chats created"
	})

	app.put("/", async () => {
		await repository.dropDb()
		await app.redis.flushall()
		await repository.fillDb()

		return "Db recreated"
	})

	app.delete("/", async () => {
		await repository.dropDb()
		await app.redis.flushall()

		return "Db dropped"
	})
}

export default adminController
