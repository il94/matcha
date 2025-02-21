import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"

export default function TempProtectedRoute() {
	const { isAuthenticated, isCompleting, userId, isPending } = useAuth()

	if (isPending) return <div>Loading...</div> // TODO Loader

	if (!isAuthenticated) return <Navigate to="/" />
	if (!isCompleting) return <Navigate to="/home" />

	return <Outlet context={{ userId, isAuthenticated }} />
}
