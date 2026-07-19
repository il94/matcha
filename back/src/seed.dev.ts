import "dotenv/config"
import fastify from "fastify"
import fastifyPlugin from "fastify-plugin"
import dbPlugin from "./db/db.plugin"
import adminRepository from "./admin/admin.repository"

/**
 * Script de seed du compte dev uniquement (hors HTTP).
 *
 * Crée le seul compte de développement `ilandols` (login connu pour les tests
 * manuels), désormais exclu des ~500 profils générés par `npm run seed`.
 * Le schéma et les tags sont créés au préalable par `dbPlugin` (onReady → initDb),
 * `fillDevUser()` n'a donc qu'à insérer le user.
 *
 * Usage : `docker compose exec back npm run seed:dev`
 * (le host `db` de DATABASE_URL ne se résout que dans le réseau Docker)
 */
const seedDev = async () => {
	const app = fastify({
		logger: {
			transport: {
				target: "pino-pretty",
				options: { ignore: "pid,hostname" },
			},
		},
	})

	app.register(fastifyPlugin(dbPlugin))

	try {
		await app.ready()

		const repository = new adminRepository(app, {})

		await repository.fillDevUser()

		await app.close()
		process.exit(0)
	} catch (error) {
		app.log.error(error, "Seed dev failed")
		await app.close()
		process.exit(1)
	}
}

seedDev()
