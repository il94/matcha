type SocketMessage = {
	type: "message" | "error"
} & Partial<MessageData>
