import { useOutletContext } from "react-router"

type OutletAuthContext = {
	user: User
	socket: WebSocket

	isAuthenticated: boolean
	isCompleting: boolean
	isReseting: boolean

	isPending: boolean
	isError: boolean
	logout: () => void
	publicLogout: () => void
}

export default function useAuthOutletContext() {
	return useOutletContext<OutletAuthContext>()
}
