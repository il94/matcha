import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { BadRequestException } from "@/lib/HttpException"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import convertObjectKeysToCamelCase from "@/lib/convertObjectKeysToCamelCase"
import { createUserMutation, getTagsQuery, getUserQuery, getUsersQuery } from "@/db/queries"

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

			const [user] = result.rows
			return user
		} catch (error) {
			throw new BadRequestException((error as Error).message)
		}
	}

	async getUsers(page: number, limit: number): Promise<{
		users: UserData[],
		nextPage: number | null
	}> {
		const result = await this.db.query(getUsersQuery, [page, limit])

		for (const user of result.rows) {
			user.images = []
			for (const imageName of user.image_names) {

				// TODO Décommenter cette partie quand il y aura de vrais users
				// const s3Url = await this.getS3Url(imageName)
				// user.images.push(s3Url)

				// TODO Temporaire pour fake users
				user.images.push(imageName)

			}
			delete user.image_names
		}

		const users = convertObjectKeysToCamelCase(result.rows)
		const nextPage = result.rows.length >= limit ? page + 1 : null

		return {
			users,
			nextPage
		}
	}

	async getUser(userId: UserData["id"]): Promise<UserData> {
		const result = await this.db.query(getUserQuery, [userId])

		result.rows[0].images = []
		for (const imageName of result.rows[0].image_names) {
			// TODO Décommenter cette partie quand il y aura de vrais users
			// const s3Url = await this.getS3Url(imageName)
			// result.rows[0].images.push(imageName)

			// TODO Temporaire pour fake users
			result.rows[0].images.push(imageName)
		}
		delete result.rows[0].image_names

		const [user] = convertObjectKeysToCamelCase(result.rows)
		return user
	}


	async getTags(): Promise<TagData[]> {
		const result = await this.db.query(getTagsQuery)

		const tags = convertObjectKeysToCamelCase(result.rows)
		return tags
	}

	async getS3Url(imageName: string) {
		const s3Url = await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: imageName,
			}),
			{ expiresIn: 15 * 60 },
		)

		return s3Url
	}

}

export default appRepository
