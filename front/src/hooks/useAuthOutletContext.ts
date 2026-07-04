import { useOutletContext } from "react-router"

type OutletAuthContext = {
	user: User
	socket: WebSocket
	isReady: boolean

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
