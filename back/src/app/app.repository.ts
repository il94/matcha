import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { BadRequestException } from "@/lib/HttpException"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import convertObjectKeysToCamelCase from "@/lib/convertObjectKeysToCamelCase"
import { createUserMutation, getUsersQuery } from "@/db/queries"

class appRepository {
	private db
	private s3

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.db = app.pg
		this.s3 = app.s3
	}

	async createUser(
		userData: Omit<UserData, "id" | "createdAt">,
	): Promise<UserData[]> {
		if (!userData.bio) userData.bio = undefined
		if (!userData.elo) userData.elo = 0
		if (!userData.views) userData.views = 0
		if (!userData.matchs) userData.matchs = 0
		if (!userData.dates) userData.dates = 0

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

	async getUsers(): Promise<UserData[]> {
		const result = await this.db.query(getUsersQuery)

		for (const user of result.rows) {
			user.images = []
			for (const imageName of user.image_names) {
				user.images.push(
					await getSignedUrl(
						this.s3,
						new GetObjectCommand({
							Bucket: process.env.AWS_BUCKET_NAME,
							Key: imageName,
						}),
						{ expiresIn: 15 * 60 },
					),
				)
			}
			delete user.image_names
		}

		return convertObjectKeysToCamelCase(result.rows)
	}
}

export default appRepository
