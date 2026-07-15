import { Loader2Icon } from "lucide-react"
import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import { ErrorState } from "@/components/ui/error-state"
import { AxiosError } from "axios"

export default function PrivateRoute() {
	const {
		user,
		socket,
		socketStatus,
		isAuthenticated,
		isPending,
		isError,
		error,
		logout,
	} = useAuth()

	if (isPending)
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2Icon className="size-8 animate-spin" />
			</div>
		)

	if (isError && (error as AxiosError)?.response?.status !== 401)
		return (
			<div className="flex h-full items-center justify-center p-6">
				<ErrorState message="We couldn't reach the server. Please check your connection and try again." />
			</div>
		)

	if (!isAuthenticated) return <Navigate to="/" />

	return <Outlet context={{ user, logout, socket, socketStatus }} />
}
