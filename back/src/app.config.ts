import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import fastifyMultipart from "@fastify/multipart"
import { FastifyPluginAsync } from "fastify"
import { BadRequestException } from "./lib/HttpException"
import {
	ALLOWED_IMAGE_FORMATS,
	MAX_INPUT_PIXELS,
} from "./lib/normalizeImage"
import sharp from "sharp"

const appConfig: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyCors, {
		origin: process.env.CORS_ORIGIN,
		credentials: process.env.CORS_CREDENTIALS === "true",
	})
	app.register(fastifyCookie, {
		parseOptions: {
			httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
			sameSite: process.env.COOKIE_SAME_SITE as "strict" | "lax" | "none",
			maxAge: parseInt(process.env.COOKIE_MAX_AGE!),
			secure: process.env.COOKIE_SECURE === "true",
		},
	})
	app.register(fastifyMultipart, {
		attachFieldsToBody: "keyValues",
		limits: {
			fileSize: parseInt(process.env.MULTIPART_FILE_SIZE!),
			files: parseInt(process.env.MULTIPART_FILES!),
		},
		onFile: async (part) => {
			if (!part.mimetype.startsWith("image/")) throw new BadRequestException()

			try {
				const buffer = await part.toBuffer()

				const metadata = await sharp(buffer, {
					limitInputPixels: MAX_INPUT_PIXELS,
				}).metadata()

				if (
					!metadata.format ||
					!ALLOWED_IMAGE_FORMATS.includes(metadata.format)
				) {
					throw new BadRequestException()
				}
			} catch (error) {
				throw new BadRequestException()
			}
		},
	})
}

export default appConfig
