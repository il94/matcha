import { Outlet, useLocation } from "react-router"
import HeaderNavbar from "./HeaderNavbar"
import FooterNavbar from "./FooterNavbar"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import SearchSettingsPanel from "./search/SearchSettingsPanel"
import NotificationsSheet from "./notifications/NotificationsSheet"
import getNotifications from "@/services/getNotifications"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { Loader2Icon } from "lucide-react"
import { ErrorState } from "@/components/ui/error-state"

const FILTERS_STORAGE_KEY = "matcha-get-users-filters"

function loadStoredFilters(): GetUsersFilters {
	try {
		const raw = localStorage.getItem(FILTERS_STORAGE_KEY)
		return raw ? (JSON.parse(raw) as GetUsersFilters) : {}
	} catch {
		return {}
	}
}

export default function MobileLayout() {
	const authOutletContext = useAuthOutletContext()

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

	return (
		<main className="flex h-dvh flex-col justify-between">
			<HeaderNavbar
				unreadCount={unreadCount}
				onOpenNotifications={() => {
					setIsSearchOpen(false)
					setIsNotificationsOpen((prev) => !prev)
				}}
				onOpenSearch={() => {
					setIsNotificationsOpen(false)
					setIsSearchOpen((prev) => !prev)
				}}
			/>
			{authOutletContext.socketStatus === "connecting" ? (
				<div className="flex grow items-center justify-center">
					<Loader2Icon className="size-8 animate-spin" />
				</div>
			) : authOutletContext.socketStatus === "failed" ? (
				<div className="flex grow items-center justify-center p-6">
					<ErrorState message="We can't get you online right now. Check your connection and give it another shot!" />
				</div>
			) : (
				<Outlet context={{ ...authOutletContext, filters }} />
			)}
			<FooterNavbar
				onNavigate={() => {
					setIsSearchOpen(false)
					setIsNotificationsOpen(false)
				}}
			/>
			<SearchSettingsPanel
				isOpen={isSearchOpen}
				initialFilters={filters}
				onApply={(next) => {
					setFilters(next)
					setIsSearchOpen(false)
				}}
				onReset={() => {
					setFilters({})
					setIsSearchOpen(false)
				}}
				onClose={() => setIsSearchOpen(false)}
			/>
			<NotificationsSheet
				isOpen={isNotificationsOpen}
				notifications={notifications ?? []}
				isPending={isNotificationsPending}
				isError={isNotificationsError}
				onClose={() => setIsNotificationsOpen(false)}
			/>
		</main>
	)
}
