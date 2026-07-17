import { Outlet, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import useIsDesktop from "@/hooks/useIsDesktop"
import getNotifications from "@/services/getNotifications"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { ErrorState } from "@/components/ui/error-state"
import MobileLayout from "./mobile/MobileLayout"
import DesktopLayout from "./desktop/DesktopLayout"

const FILTERS_STORAGE_KEY = "matcha-get-users-filters"

function loadStoredFilters(): GetUsersFilters {
	try {
		const raw = localStorage.getItem(FILTERS_STORAGE_KEY)
		return raw ? (JSON.parse(raw) as GetUsersFilters) : {}
	} catch {
		return {}
	}
}

export default function ResponsiveLayout() {
	const authOutletContext = useAuthOutletContext()
	const isDesktop = useIsDesktop()

	const [filters, setFilters] = useState<GetUsersFilters>(loadStoredFilters)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

	const {
		data: notifications,
		isPending: isNotificationsPending,
		isError: isNotificationsError,
	} = useQuery({
		queryKey: ["notifications"],
		queryFn: DEBUG_ERRORS.notifications ? forcedError : getNotifications,
	})

	const unreadCount = isNotificationsError
		? 0
		: (notifications?.filter((notification) => !notification.read).length ?? 0)

	useEffect(() => {
		localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters))
	}, [filters])

	const location = useLocation()
	useEffect(() => {
		setIsSearchOpen(false)
		setIsNotificationsOpen(false)
	}, [location.pathname])

	const content =
		authOutletContext.socketStatus === "connecting" ? (
			<div className="flex grow items-center justify-center">
				<Loader2Icon className="size-8 animate-spin" />
			</div>
		) : authOutletContext.socketStatus === "failed" ? (
			<div className="flex grow items-center justify-center p-6">
				<ErrorState message="We can't get you online right now. Check your connection and give it another shot !" />
			</div>
		) : (
			<Outlet context={{ ...authOutletContext, filters }} />
		)

	const Layout = isDesktop ? DesktopLayout : MobileLayout

	return (
		<Layout
			content={content}
			unreadCount={unreadCount}
			filters={filters}
			notifications={notifications ?? []}
			isNotificationsPending={isNotificationsPending}
			isNotificationsError={isNotificationsError}
			isSearchOpen={isSearchOpen}
			isNotificationsOpen={isNotificationsOpen}
			onToggleSearch={() => {
				setIsNotificationsOpen(false)
				setIsSearchOpen((prev) => !prev)
			}}
			onToggleNotifications={() => {
				setIsSearchOpen(false)
				setIsNotificationsOpen((prev) => !prev)
			}}
			onNavigate={() => {
				setIsSearchOpen(false)
				setIsNotificationsOpen(false)
			}}
			onApplyFilters={(next) => {
				setFilters(next)
				setIsSearchOpen(false)
			}}
			onResetFilters={() => {
				setFilters({})
				setIsSearchOpen(false)
			}}
			onCloseSearch={() => setIsSearchOpen(false)}
			onCloseNotifications={() => setIsNotificationsOpen(false)}
		/>
	)
}
