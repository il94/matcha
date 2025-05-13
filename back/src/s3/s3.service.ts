import {
	DeleteObjectCommand,
	DeleteObjectsCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomBytes, randomUUID } from "crypto"
import { FastifyInstance, FastifyPluginOptions } from "fastify"

class s3Service {
	private s3

	private S3_IMAGES_DURATION = 15 * 60

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.s3 = app.s3
	}

	async uploadFiles(files: Buffer[]) {
		const fileNames = []

		try {
			let i = 0
			for (const file of files) {
				const fileName = await this.uploadFile(file)
				fileNames.push(fileName)
				i++
			}
		} catch (error) {
			await this.deleteFiles(fileNames)
			throw error
		}

		return fileNames
	}

	async uploadFile(file: Buffer) {
		const fileName = this.getRandomToken()
		await this.s3.send(
			new PutObjectCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: fileName,
				Body: file,
			}),
		)

		return fileName
	}

	async getSignedURL(fileName: string) {
		const signedURL = await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: fileName,
			}),
			{ expiresIn: this.S3_IMAGES_DURATION },
		)

		return signedURL
	}

	async deleteFiles(fileNames: PictureData["name"][]) {
		if (!fileNames.length) return

		await this.s3.send(
			new DeleteObjectsCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Delete: {
					Objects: fileNames.map((name) => ({ Key: name })),
				},
			}),
		)
	}

	async deleteFile(fileName: PictureData["name"]) {
		await this.s3.send(
			new DeleteObjectCommand({
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: fileName,
			}),
		)
	}

	/* ============ Utils ============ */

	getRandomToken(length = 32) {
		return randomBytes(length).toString("hex")
	}
}
export default s3Service
