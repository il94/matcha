import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { createUserMutation } from "@/db/queries"
import { BadRequestException } from "@/lib/HttpException"

class appRepository {
	private db
	private s3

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
		this.s3 = app.s3
	}

	async createUser(userData: Omit<UserData, "id" | "createdAt">) {
		if (!userData.gender) userData.gender = undefined
		if (!userData.sexuality) userData.sexuality = undefined

		try {
			const result = await this.db.query(
				createUserMutation,
				Object.values(userData),
			)

			return result.rows
		} catch (error) {
			throw new BadRequestException((error as Error).message)
		}
	}
}

export default appRepository
