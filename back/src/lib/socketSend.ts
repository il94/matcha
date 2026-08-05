import { WebSocket } from "ws"

type SocketMessageType = "message" | "location" | "notification" | "error"

export default function socketSend(
	socket: WebSocket,
	type: SocketMessageType,
	data?: Record<string, unknown>,
) {
	socket.send(
		JSON.stringify({
			type,
			...data,
		}),
	)
}

export function socketBroadcast(
	sockets: Set<WebSocket> | undefined,
	type: SocketMessageType,
	data?: Record<string, unknown>,
) {
	if (!sockets) return

	for (const socket of sockets) socketSend(socket, type, data)
}
