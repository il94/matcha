import socketSend from "@/lib/socketSend"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

function emitLocation(socket: WebSocket) {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			const { latitude, longitude } = position.coords

			socketSend(socket, "location", { latitude, longitude })
		},
		() => {
			socketSend(socket, "location")
		},
		{
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		},
	)
}

export default function useSocket() {
	const [socket, setSocket] = useState<WebSocket>()
	const [isReady, setIsReady] = useState(false)
	const queryClient = useQueryClient()

	useEffect(() => {
		const newSocket = new WebSocket(import.meta.env.VITE_API_BACK_WS)
		setSocket(newSocket)

		newSocket.onmessage = (event) => {
			const message = JSON.parse(event.data)
			if (message.type === "message")
				queryClient.invalidateQueries({ queryKey: ["chats"] })
			else if (message.type === "location") {
				queryClient.invalidateQueries({ queryKey: ["verify"] })
				setIsReady(true)
			}
		}

		newSocket.onopen = () => {
			emitLocation(newSocket)
		}

		return () => {
			newSocket.close()
		}
	}, [queryClient])

	return {
		socket,
		isReady,
	}
}
