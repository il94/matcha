import { Loader2Icon } from "lucide-react"
import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"

export default function PublicRoute() {
	const { isAuthenticated, isCompleting, isReseting, isPending } = useAuth()

	if (isPending)
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2Icon className="size-8 animate-spin" />
			</div>
		)

	if (isCompleting) return <Navigate to="/complete" />
	if (isReseting) return <Navigate to="/reset" />
	if (isAuthenticated) return <Navigate to="/home" />

	return <Outlet />
}
