import { Outlet, useLocation } from "react-router"
import HeaderNavbar from "./HeaderNavbar"
import FooterNavbar from "./FooterNavbar"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import { useEffect, useState } from "react"
import SearchSettingsPanel from "./search/SearchSettingsPanel"

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

	useEffect(() => {
		localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters))
	}, [filters])

	const location = useLocation()
	useEffect(() => {
		setIsSearchOpen(false)
	}, [location.pathname])

	return (
		<main className="flex h-dvh flex-col justify-between">
			<HeaderNavbar onOpenSearch={() => setIsSearchOpen(true)} />
			{!authOutletContext.isReady ? (
				<p>Connecting ...</p> // TODO
			) : (
				<Outlet context={{ ...authOutletContext, filters }} />
			)}
			<FooterNavbar />
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
		</main>
	)
}
