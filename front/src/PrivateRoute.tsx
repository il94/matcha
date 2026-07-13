import { Loader2Icon } from "lucide-react"
import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"

export default function PrivateRoute() {
	const { user, socket, isReady, isAuthenticated, isPending, logout } =
		useAuth()

	if (isPending)
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2Icon className="size-8 animate-spin" />
			</div>
		)

	if (!isAuthenticated) return <Navigate to="/" />

	return <Outlet context={{ user, logout, socket, isReady }} />
}
