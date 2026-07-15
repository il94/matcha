import { useOutletContext } from "react-router"
import type { SocketStatus } from "./useSocket"

type OutletAuthContext = {
	user: User
	socket?: WebSocket
	socketStatus: SocketStatus

	isAuthenticated: boolean
	isCompleting: boolean
	isReseting: boolean

	isPending: boolean
	isError: boolean
	logout: () => void
	publicLogout: () => void

	filters: GetUsersFilters
}

export default function useAuthOutletContext() {
	return useOutletContext<OutletAuthContext>()
}
