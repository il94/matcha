export default function socketSend(
	socket: WebSocket,
	type: "message" | "location" | "error",
	data?: Record<string, unknown>,
) {
	socket.send(
		JSON.stringify({
			type,
			...data,
		}),
	)
}
