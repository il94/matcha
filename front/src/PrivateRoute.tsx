import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import useSocket from "./hooks/useSocket"

export default function PrivateRoute() {
	const { user, isAuthenticated, isPending, logout } = useAuth()

	const socket = useSocket(user)

	if (isPending) return <div>Loading...</div> // TODO Loader

	if (!isAuthenticated) return <Navigate to="/" />

	return <Outlet context={{ user, logout, socket }} />
}
