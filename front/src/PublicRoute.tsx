import { Loader2Icon } from "lucide-react"
import useAuth from "./hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import { ErrorState } from "@/components/ui/error-state"
import { AxiosError } from "axios"
import { IlandolsDemoBadge } from "ilandols-demo-badge/react"

export default function PublicRoute() {
	const {
		isAuthenticated,
		isCompleting,
		isReseting,
		isPending,
		isError,
		error,
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

	if (isCompleting) return <Navigate to="/complete" />
	if (isReseting) return <Navigate to="/reset" />
	if (isAuthenticated) return <Navigate to="/home" />

	return (
		<>
			<Outlet />
			{import.meta.env.VITE_DEMO_ENABLED === "true" && (
				<IlandolsDemoBadge
					heading="Try Matcha instantly"
					description="Welcome, and thanks for giving Matcha a try ! This demo account lets you jump straight in and explore the app, no sign up, no activation email, no profile to fill in. Log in with the credentials below to browse the profiles, open them and see how everything fits together. It's read-only, so nothing you do can break it for the next visitor."
					credentials={[
						{ label: "Username", value: import.meta.env.VITE_DEMO_USERNAME },
						{ label: "Password", value: import.meta.env.VITE_DEMO_PASSWORD },
					]}
				/>
			)}
		</>
	)
}
