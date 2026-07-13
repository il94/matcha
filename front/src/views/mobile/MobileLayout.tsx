import { Outlet, useLocation } from "react-router"
import HeaderNavbar from "./HeaderNavbar"
import FooterNavbar from "./FooterNavbar"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import SearchSettingsPanel from "./search/SearchSettingsPanel"
import NotificationsSheet from "./notifications/NotificationsSheet"
import getNotifications from "@/services/getNotifications"

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

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: getNotifications,
	})

	const unreadCount =
		notifications?.filter((notification) => !notification.read).length ?? 0

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
					setIsNotificationsOpen(true)
				}}
				onOpenSearch={() => {
					setIsNotificationsOpen(false)
					setIsSearchOpen(true)
				}}
			/>
			{!authOutletContext.isReady ? (
				<p>Connecting ...</p> // TODO
			) : (
				<Outlet context={{ ...authOutletContext, filters }} />
			)}
			<FooterNavbar onNavigate={() => setIsSearchOpen(false)} />
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
				onClose={() => setIsNotificationsOpen(false)}
			/>
		</main>
	)
}
