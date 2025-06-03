type SocketMessage = {
	type: "message" | "location" | "error"
} & Partial<MessageData> & {
		longitude?: number
		latitude?: number
	}
