import "dotenv/config"
import fastify from "fastify"
import fastifyPlugin from "fastify-plugin"
import fs from "fs"
import dbPlugin from "./db/db.plugin"

/**
 * Script de création du compte de démonstration (hors HTTP).
 *
 * Se contente d'exécuter `sql/demo-user.sql`, qui reste la source de vérité :
 * le compte n'est volontairement pas construit en TypeScript comme les profils
 * de `npm run seed`, pour rester modifiable directement en SQL.
 *
 * Le schéma et les tags sont créés au préalable par `dbPlugin`
 * (onReady → initDb), le script n'a donc qu'à insérer.
 *
 * Le SQL crée aussi les matchs, les conversations, les notifications et les
 * visites reçues par le compte : verrouillé en lecture seule, il ne peut rien
 * produire lui-même, et ses onglets Chat, Notifications et Visites seraient
 * vides sans ces données.
 * Elles renvoient à des personnages insérés par `npm run seed`, qui doit donc
 * avoir été joué avant (sinon seul le compte est créé, sans chats ni notifs).
 *
 * Le SQL est idempotent (ON CONFLICT sur l'email, puis remplacement des photos,
 * des tags, des votes, des chats, des notifications et des visites) : rejouer la
 * commande est sans risque.
 *
 * Usage : `docker compose exec back npm run seed:demo`
 * (le host `db` de DATABASE_URL ne se résout que dans le réseau Docker)
 */
const SQL_FILE = "./sql/demo-user.sql"

const seedDemo = async () => {
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

		if (!process.env.DEMO_USER_EMAIL) {
			app.log.warn(
				"DEMO_USER_EMAIL n'est pas défini : le compte sera créé mais ne sera pas reconnu comme compte de démonstration (il ne sera donc pas verrouillé en lecture seule)",
			)
		}

		const sql = fs.readFileSync(SQL_FILE, "utf-8")

		app.log.info(`DB: Create demo user (${SQL_FILE})`)
		await app.pg.query(sql)

		// Les chats et les notifications dépendent des profils de `npm run seed` :
		// s'ils manquent, le SQL n'insère rien et échoue en silence, d'où ce
		// contrôle explicite.
		const { rows } = await app.pg.query<{
			chats: string
			notifications: string
			views: string
		}>(
			`SELECT
				(SELECT count(*) FROM chats
					WHERE user_id_1 = users.id OR user_id_2 = users.id) AS chats,
				(SELECT count(*) FROM notifications
					WHERE user_id = users.id) AS notifications,
				(SELECT count(*) FROM views
					WHERE target_id = users.id) AS views
			FROM users
			WHERE email = 'demo@demo.com'`,
		)

		const { chats = "0", notifications = "0", views = "0" } = rows[0] ?? {}

		if (chats === "0") {
			app.log.warn(
				"Le compte démo n'a aucune conversation : les profils attendus n'existent pas en base, jouer `npm run seed` puis relancer ce script",
			)
		}

		app.log.info(
			`DB: Demo user ready (${chats} chats, ${notifications} notifications, ${views} views)`,
		)

		await app.close()
		process.exit(0)
	} catch (error) {
		app.log.error(error, "Seed demo failed")
		await app.close()
		process.exit(1)
	}
}

seedDemo()
