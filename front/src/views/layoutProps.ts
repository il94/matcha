import type { ReactNode } from "react"

export type LayoutProps = {
	content: ReactNode

	unreadCount: number
	filters: GetUsersFilters

	notifications: AppNotification[]
	isNotificationsPending: boolean
	isNotificationsError: boolean

	isSearchOpen: boolean
	isNotificationsOpen: boolean

	onToggleSearch: () => void
	onToggleNotifications: () => void
	onNavigate: () => void
	onApplyFilters: (filters: GetUsersFilters) => void
	onResetFilters: () => void
	onCloseSearch: () => void
	onCloseNotifications: () => void
}
