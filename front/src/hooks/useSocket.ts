import socketSend from "@/lib/socketSend"
import MessageToast from "@/components/MessageToast"
import { useQueryClient } from "@tanstack/react-query"
import { createElement, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner"

async function refreshLocationIfConsented(socket: WebSocket) {
	if (!navigator.permissions || !navigator.geolocation) return

	const permission = await navigator.permissions.query({ name: "geolocation" })
	if (permission.state !== "granted") return

	navigator.geolocation.getCurrentPosition(
		(position) => {
			const { latitude, longitude } = position.coords

			socketSend(socket, "location", { latitude, longitude })
		},
		() => {},
		{
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		},
	)
}

export default function useSocket(enabled: boolean) {
	const [socket, setSocket] = useState<WebSocket>()
	const [isReady, setIsReady] = useState(false)
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	// La socket est créée une seule fois : on lit le pathname courant via une ref
	// pour ne pas afficher la bannière d'un message si on est déjà sur ce chat.
	const location = useLocation()
	const pathnameRef = useRef(location.pathname)
	useEffect(() => {
		pathnameRef.current = location.pathname
	}, [location.pathname])

	useEffect(() => {
		if (!enabled) return

		const newSocket = new WebSocket(import.meta.env.VITE_API_BACK_WS)
		setSocket(newSocket)

		newSocket.onmessage = (event) => {
			const message = JSON.parse(event.data)

			if (message.type === "message") {
				queryClient.invalidateQueries({ queryKey: ["chats"] })

				const isOnThisChat = pathnameRef.current === `/chat/${message.chatId}`
				if (!isOnThisChat) {
					toast.custom(
						(id) =>
							createElement(MessageToast, {
								id,
								authorUsername: message.authorUsername,
								authorFirstName: message.authorFirstName,
								avatar: message.authorAvatar,
								content: message.content,
								onOpen: () => navigate(`/chat/${message.chatId}`),
							}),
						{ position: "top-center", duration: 5000 },
					)
				}
			} else if (message.type === "notification") {
				queryClient.invalidateQueries({ queryKey: ["notifications"] })
			} else if (message.type === "location") {
				queryClient.invalidateQueries({ queryKey: ["verify"] })
				setIsReady(true)
			}
		}

		newSocket.onopen = () => {
			setIsReady(true)
			refreshLocationIfConsented(newSocket)
		}

		return () => {
			newSocket.close()
		}
	}, [enabled, queryClient, navigate])

	return {
		socket,
		isReady,
	}
}
