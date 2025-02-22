import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"

export default function PrivateRoute() {
	const { userId, isAuthenticated, isPending, logout } = useAuth()

	if (isPending) return <div>Loading...</div> // TODO Loader

	if (!isAuthenticated) return <Navigate to="/" />

	return <Outlet context={{ userId, logout }} />
}
