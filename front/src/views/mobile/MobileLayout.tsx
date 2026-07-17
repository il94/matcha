import HeaderNavbar from "./HeaderNavbar"
import FooterNavbar from "./FooterNavbar"
import SearchSettingsPanel from "./search/SearchSettingsPanel"
import NotificationsSheet from "./notifications/NotificationsSheet"
import type { LayoutProps } from "@/views/layoutProps"

export default function MobileLayout({
	content,
	unreadCount,
	filters,
	notifications,
	isNotificationsPending,
	isNotificationsError,
	isSearchOpen,
	isNotificationsOpen,
	onToggleSearch,
	onToggleNotifications,
	onNavigate,
	onApplyFilters,
	onResetFilters,
	onCloseSearch,
	onCloseNotifications,
}: LayoutProps) {
	return (
		<main className="flex h-dvh flex-col justify-between">
			<HeaderNavbar
				unreadCount={unreadCount}
				onOpenNotifications={onToggleNotifications}
				onOpenSearch={onToggleSearch}
			/>
			{content}
			<FooterNavbar onNavigate={onNavigate} />
			<SearchSettingsPanel
				isOpen={isSearchOpen}
				initialFilters={filters}
				onApply={onApplyFilters}
				onReset={onResetFilters}
				onClose={onCloseSearch}
			/>
			<NotificationsSheet
				isOpen={isNotificationsOpen}
				notifications={notifications}
				isPending={isNotificationsPending}
				isError={isNotificationsError}
				onClose={onCloseNotifications}
			/>
		</main>
	)
}
