import "dotenv/config"
import fastify from "fastify"
import fastifyPlugin from "fastify-plugin"
import dbPlugin from "./db/db.plugin"
import adminRepository from "./admin/admin.repository"

/**
 * Script de seed autonome (hors HTTP).
 *
 * Remplace l'ancien endpoint `POST /admin` désormais désactivé (cf. app.plugin.ts).
 * Réutilise `adminRepository.fillDb()` : crée le schéma (CREATE TABLE IF NOT EXISTS),
 * seed les tags puis les ~500 profils.
 *
 * Usage : `npm run seed`
 *
 * NB : `fillDb()` suppose une base fraîche. Pour repartir d'une base peuplée,
 * décommenter l'appel à `repository.dropDb()` ci-dessous (drop puis recrée tout).
 */
const seed = async () => {
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

		// await repository.dropDb()
		await repository.fillDb()

		await app.close()
		process.exit(0)
	} catch (error) {
		app.log.error(error, "Seed failed")
		await app.close()
		process.exit(1)
	}
}

seed()
