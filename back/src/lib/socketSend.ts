import { WebSocket } from "@fastify/websocket"

export default function socketSend(
	socket: WebSocket,
	type: "message" | "location" | "notification" | "error",
	data?: Record<string, unknown>,
) {
	socket.send(
		JSON.stringify({
			type,
			...data,
		}),
	)
}
