import { useEffect, useState } from "react"

export default function useSocket(user?: User) {
	const [socket, setSocket] = useState<WebSocket>()

	useEffect(() => {
		if (!user) return

		const newSocket = new WebSocket(import.meta.env.VITE_API_BACK_WS)
		setSocket(newSocket)

		return () => {
			newSocket.close()
		}
	}, [user])

	return socket
}
