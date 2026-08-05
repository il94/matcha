import fastifyWebsocket from "@fastify/websocket"
import { FastifyPluginAsync } from "fastify"
import { WebSocket } from "ws"

const wsPlugin: FastifyPluginAsync = async (app, options) => {
	app.register(fastifyWebsocket, {
		options: { maxPayload: parseInt(process.env.WS_MAX_PAYLOAD!) },
	})

	const clients = new Map<UserData["id"], Set<WebSocket>>()

	app.decorate("clients", clients)
}

export default wsPlugin
