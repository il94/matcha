import { FastifyPluginAsync } from "fastify"
import nodemailer from "nodemailer"

const mailerPlugin: FastifyPluginAsync = async (app, options) => {
	app.decorate(
		"mailer",
		nodemailer.createTransport({
			host: process.env.MAILER_HOST,
			port: parseInt(process.env.MAILER_PORT!),
			secure: process.env.MAILER_SECURE === "true",
			auth: {
				user: process.env.MAILER_USER,
				pass: process.env.MAILER_PASS,
			},
		}),
	)
}

export default mailerPlugin
