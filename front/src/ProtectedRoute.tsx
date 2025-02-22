import useAuth from "./hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router"

export default function ProtectedRoute() {
	const {
		isAuthenticated,
		isCompleting,
		isReseting,
		isPending,
		logout,
		publicLogout,
	} = useAuth()
	const location = useLocation()

	if (isPending) return <div>Loading...</div> // TODO Loader

	if (isAuthenticated) return <Navigate to="/home" />

	if (
		(!isCompleting && !isReseting) ||
		(isCompleting && location.pathname !== "/complete") ||
		(isReseting && location.pathname !== "/reset")
	)
		return <Navigate to="/" />

	return <Outlet context={{ logout, publicLogout }} />
}
