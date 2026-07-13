type SocketMessage = {
	type: "message" | "location" | "notification" | "error"
} & Partial<MessageData> & {
		longitude?: number
		latitude?: number
	}
