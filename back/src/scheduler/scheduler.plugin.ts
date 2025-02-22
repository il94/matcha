import { deleteInactiveUsersMutation } from "@/db/queries/app"
import fastifySchedule from "@fastify/schedule"
import { FastifyPluginAsync } from "fastify"
import { AsyncTask, CronJob } from "toad-scheduler"

const schedulerPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifySchedule)

	const deleteInactiveUsers = new AsyncTask("deleteInactiveUsers", async () => {
		const result = await app.pg.query(deleteInactiveUsersMutation)

		const deletedUsers = result.rows

		console.warn("Deleted inactive users", deletedUsers)
	})

	const cronJob = new CronJob(
		{ cronExpression: process.env.SCHEDULER_JOB_CRON! },
		deleteInactiveUsers,
	)

	app.ready(() => {
		app.scheduler.addCronJob(cronJob)
	})
}

export default schedulerPlugin
