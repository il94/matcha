import capitalize from "@/lib/capitalize"
import { FastifyInstance, FastifyPluginOptions } from "fastify"

class mailerService {
	private mailer

	private MAILER_FROM = "Matcha <system.matcha@gmail.com>"

	constructor(app: FastifyInstance, options: FastifyPluginOptions) {
		this.mailer = app.mailer
	}

	async sendActivationTokenEmail(
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

	/* ============ Templates ============ */

	getActivationTokenEmailTemplate(
		firstname: UserData["firstName"],
		activationToken: string,
	) {
		const body = `
			<div class="container">
				<h1 class="title">Hi, ${firstname}</h1>
				<p>
					Welcome to Matcha, where exciting connections happen ! We're thrilled to have you on board.
				</p>
				<p>
					Before you dive into your Matcha experience, you'll need to activate your account. Let's get you started!
				</p>
				<p>
					<a class="button" href="${process.env.API_BACK_URL}/activate?token=${activationToken}">Activate Your Account</a>
				</p>
				<p class="footer">
					If this email wasn't meant for you, please feel free to ignore it.
				</p>
			</div>
		`

		return this.getEmailTemplate(body)
	}

	getEmailTemplate(body: string) {
		return `
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					p {
						font-size: 16px;
					}
					a {
						color: #007bff;
						text-decoration: none;
					}

					body {
						font-family: Arial, sans-serif;
						line-height: 1.6;
						background-color: #1f1f1f;
						color: #333;
						margin: 0;
						padding: 20px;
					}

					.container {
						width: 90%;
						height: 90%;
						max-width: 600px;
						margin: 20px auto;
						background: #fff;
						padding: 20px;
						border-radius: 8px;
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					}

					.title {
						color: #cda2ab;
					}

					.button {
						display: inline-block;
						background-color: #4ea268;
						color: white;
						padding: 10px 28px;
						border-radius: 5px;
						text-decoration: none;
						font-weight: 600;
					}

					.footer {
						margin-top: 20px;
						font-size: 14px;
						color: #666;
					}
				</style>
			</head>
			<body>
				${body}
			</body>
			</html>
		`
	}

	/* ============ Utils ============ */
}
export default mailerService
