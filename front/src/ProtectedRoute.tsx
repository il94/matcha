import { Loader2Icon } from "lucide-react"
import useAuth from "./hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router"
import { ErrorState } from "@/components/ui/error-state"
import { AxiosError } from "axios"

export default function ProtectedRoute() {
	const {
		isAuthenticated,
		isCompleting,
		isReseting,
		isPending,
		isError,
		error,
		logout,
		publicLogout,
	} = useAuth()
	const location = useLocation()

	if (isPending)
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2Icon className="size-8 animate-spin" />
			</div>
		)

	if (isError && (error as AxiosError)?.response?.status !== 401)
		return (
			<div className="flex h-full items-center justify-center p-6">
				<ErrorState message="We're having trouble reaching Matcha. Check your connection and try again !" />
			</div>
		)

	if (isAuthenticated) return <Navigate to="/home" />

	if (
		(!isCompleting && !isReseting) ||
		(isCompleting && location.pathname !== "/complete") ||
		(isReseting && location.pathname !== "/reset")
	)
		return <Navigate to="/" />

	return <Outlet context={{ logout, publicLogout }} />
}
