import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"

export default function ProtectedRoute() {
	const { isAuthenticated, isPending } = useAuth()

	if (isPending) return <div>Loading...</div> // TODO Loader

	if (!isAuthenticated) return <Navigate to="/" />

	return <Outlet />
}
