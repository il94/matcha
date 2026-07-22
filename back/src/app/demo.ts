import * as appQueries from "@/db/queries/app"
import { FastifyInstance } from "fastify"

let cachedDemoUserId: string | null = null

export async function getDemoUserId(
	app: FastifyInstance,
): Promise<string | null> {
	if (!process.env.DEMO_USER_EMAIL) return null
	if (cachedDemoUserId) return cachedDemoUserId

	const result = await app.pg.query(appQueries.getUserByEmailQuery, [
		process.env.DEMO_USER_EMAIL,
	])

	cachedDemoUserId = result.rows[0]?.id ?? null

	return cachedDemoUserId
}

export async function isDemoUser(
	app: FastifyInstance,
	userId: string,
): Promise<boolean> {
	const demoUserId = await getDemoUserId(app)

	return !!demoUserId && demoUserId === userId
}
