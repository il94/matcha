import capitalize from "@/lib/capitalize"
import escapeHtml from "@/lib/escapeHtml"
import { FastifyInstance, FastifyPluginOptions } from "fastify"

class mailerService {
	private mailer

	private MAILER_FROM = process.env.MAILER_FROM

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.mailer = app.mailer
	}

	async sendActivationEmail(
		to: UserData["email"],
		firstName: UserData["firstName"],
		token: string,
	) {
		await this.mailer.sendMail({
			to,
			subject: "Activate Your Account",
			from: this.MAILER_FROM,
			html: this.getActivationTokenEmailTemplate(capitalize(firstName), token),
		})
	}

	async sendResetPasswordEmail(to: UserData["email"], token: string) {
		await this.mailer.sendMail({
			to,
			subject: "Reset Your Password",
			from: this.MAILER_FROM,
			html: this.getResetPasswordEmailTemplate(token),
		})
	}

	async sendNewEmailEmail(to: UserData["email"], token: string) {
		await this.mailer.sendMail({
			to,
			subject: "Change Your Email",
			from: this.MAILER_FROM,
			html: this.getNewEmailEmailTemplate(token),
		})
	}

	/* ============ Templates ============ */

	getActivationTokenEmailTemplate(
		firstName: UserData["firstName"],
		token: string,
	) {
		const body = `
			<h1 class="title">Hi, ${escapeHtml(firstName)}</h1>
			<p>
				Welcome to Matcha, where exciting connections happen ! We're thrilled to have you on board.
			</p>
			<p>
				Before you dive into your Matcha experience, you'll need to activate your account. Let's get you started!
			</p>
			<p>
				<a class="button" style="color: #ffffff;" href="${process.env.API_BACK_URL}/activate?token=${token}">Activate Your Account</a>
			</p>
			<p class="footer">
				If this email wasn't meant for you, please feel free to ignore it.
			</p>
		`

		return this.getEmailTemplate(body)
	}

	getResetPasswordEmailTemplate(token: string) {
		const body = `
			<h1 class="title">Hey there,</h1>
			<p>
				Forgot your password ? No worries, it happens ! You can reset it with the link below.
			</p>
			<p>
				<a class="button" style="color: #ffffff;" href="${process.env.API_BACK_URL}/reset?token=${token}">Reset Your Password</a>
			</p>
			<p class="footer">
				If you didn't request this, you can safely ignore this email.
			</p>
		`

		return this.getEmailTemplate(body)
	}

	getNewEmailEmailTemplate(token: string) {
		const body = `
			<h1 class="title">Hey there,</h1>
			<p>
				You've requested to change your email address. Please click the link below to confirm the new email.
			</p>
			<p>
				<a class="button" style="color: #ffffff;" href="${process.env.API_BACK_URL}/change-email?token=${token}">Confirm New Email</a>
			</p>
			<p class="footer">
				If this email wasn't meant for you, please feel free to ignore it.
			</p>
		`

		return this.getEmailTemplate(body)
	}

	getEmailTemplate(body: string) {
		const logo =
			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjQgNDRWMjIiLz48cGF0aCBkPSJNMjQgMzBDMjQgMjEgMzAgMTIgNDEgMTBjMSAxMS01IDIwLTE3IDIwWiIvPjxwYXRoIGQ9Ik0yNCAyNEMyNCAxNiAxOSA4IDggN2MtMSAxMCA0IDE3IDE2IDE3WiIvPjwvc3ZnPg=="

		return `
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					p {
						font-size: 16px;
					}
					a {
						color: #cda2ab;
						text-decoration: none;
					}

					body {
						font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
						line-height: 1.6;
						background-color: #1f1f1f;
						color: #e5e5e5;
						margin: 0;
						padding: 20px;
					}

					.container {
						width: 90%;
						max-width: 600px;
						margin: 20px auto;
						background: #2a2a2a;
						border-radius: 0 0 16px 16px;
						box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
						overflow: hidden;
					}

					.header {
						background-color: #4ea268;
						background-image: linear-gradient(135deg, #4ea268 0%, rgba(78, 162, 104, 0.85) 55%, #cda2ab 100%);
						border-radius: 16px 16px 0 0;
						padding: 32px 20px;
						text-align: center;
					}

					.header img {
						display: block;
						width: 40px;
						height: 40px;
						margin: 0 auto 8px;
					}

					.header .wordmark {
						color: #ffffff;
						font-size: 30px;
						font-weight: 800;
						letter-spacing: 1px;
						margin: 0;
					}

					.body-content {
						padding: 20px;
					}

					.title {
						color: #cda2ab;
					}

					.button {
						display: inline-block;
						background-color: #4ea268;
						color: white;
						padding: 10px 28px;
						border-radius: 6px;
						text-decoration: none;
						font-weight: 600;
					}

					.footer {
						margin-top: 20px;
						font-size: 14px;
						color: #999;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<img src="${logo}" alt="Matcha" />
						<p class="wordmark">matcha</p>
					</div>
					<div class="body-content">
						${body}
					</div>
				</div>
			</body>
			</html>
		`
	}

	/* ============ Utils ============ */
}
export default mailerService
