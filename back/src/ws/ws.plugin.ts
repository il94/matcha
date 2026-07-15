import fastifyWebsocket from "@fastify/websocket"
import { FastifyPluginAsync } from "fastify"
import { WebSocket } from "ws"

const wsPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyWebsocket, { options: { maxPayload: 1048576 } })

	const clients = new Map<UserData["id"], WebSocket>()

	app.decorate("clients", clients)
}

export default wsPlugin
