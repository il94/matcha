import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function useSocket(user?: User) {
	const [socket, setSocket] = useState<WebSocket>()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!user) return

		const newSocket = new WebSocket(import.meta.env.VITE_API_BACK_WS)
		setSocket(newSocket)

		newSocket.onmessage = (event) => {
			const message = JSON.parse(event.data)
			if (message.type === "message")
				queryClient.invalidateQueries({ queryKey: ["chats"] })
		}
		return () => {
			newSocket.close()
		}
	}, [user, queryClient])

	return socket
}
