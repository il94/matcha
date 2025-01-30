import { S3Client } from "@aws-sdk/client-s3"
import { FastifyPluginAsync } from "fastify"

const s3Plugin: FastifyPluginAsync = async (app, options) => {
	app.decorate(
		"s3",
		new S3Client({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
			},
		}),
	)

	app.addHook("onClose", (app) => {
		app.s3.destroy()
	})
}

export default s3Plugin
