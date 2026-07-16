import socketSend from "@/lib/socketSend"
import MessageToast from "@/components/MessageToast"
import notify from "@/lib/toast"
import { useQueryClient } from "@tanstack/react-query"
import { createElement, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner"
import { DEBUG_ERRORS } from "@/lib/debugError"

export type SocketStatus = "connecting" | "connected" | "failed"

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
	const [socketStatus, setSocketStatus] = useState<SocketStatus>("connecting")
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const location = useLocation()
	const pathnameRef = useRef(location.pathname)
	useEffect(() => {
		pathnameRef.current = location.pathname
	}, [location.pathname])

	const hasConnectedRef = useRef(false)
	const closedByUsRef = useRef(false)
	const debugDroppedRef = useRef(false)

	useEffect(() => {
		if (!enabled) return

		closedByUsRef.current = false

		if (DEBUG_ERRORS.socketConnect) {
			setSocketStatus("failed")
			return
		}

		const newSocket = new WebSocket(import.meta.env.VITE_API_BACK_WS)
		setSocket(newSocket)

		newSocket.onmessage = (event) => {
			let message
			try {
				message = JSON.parse(event.data)
			} catch {
				return
			}

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
			} else if (message.type === "error") {
				notify.error(
					"Something glitched on our live connection. Try that again !",
				)
			}
		}

		newSocket.onopen = () => {
			hasConnectedRef.current = true
			setSocketStatus("connected")
			refreshLocationIfConsented(newSocket)

			if (DEBUG_ERRORS.socketDrop && !debugDroppedRef.current) {
				debugDroppedRef.current = true
				setTimeout(() => newSocket.close(), 3000)
			}
		}

		newSocket.onerror = () => newSocket.close()

		newSocket.onclose = () => {
			if (closedByUsRef.current) return

			if (hasConnectedRef.current)
				notify.error("We lost touch ! Reload to get back online.")
			else setSocketStatus("failed")
		}

		return () => {
			closedByUsRef.current = true
			newSocket.close()
		}
	}, [enabled, queryClient, navigate])

	return {
		socket,
		socketStatus,
	}
}
