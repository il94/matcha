import { Loader2Icon } from "lucide-react"
import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import { ErrorState } from "@/components/ui/error-state"
import { AxiosError } from "axios"
import DemoDialog from "./views/mobile/login/DemoDialog"

export default function PrivateRoute() {
	const {
		user,
		socket,
		socketStatus,
		isAuthenticated,
		isDemo,
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
				<ErrorState message="We're having trouble reaching Matcha. Check your connection and try again !" />
			</div>
		)

	if (!isAuthenticated) return <Navigate to="/" />

	return (
		<>
			<Outlet context={{ user, logout, socket, socketStatus }} />
			{isDemo && <DemoDialog />}
		</>
	)
}
