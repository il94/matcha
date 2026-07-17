import { useLocation } from "react-router"
import type { LayoutProps } from "@/views/layoutProps"
import Sidebar from "./Sidebar"
import SearchSettingsPanel from "@/views/mobile/search/SearchSettingsPanel"
import NotificationsSheet from "@/views/mobile/notifications/NotificationsSheet"

export default function DesktopLayout({
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
	const location = useLocation()
	const isChatConversation = /^\/chat\/[^/]+$/.test(location.pathname)

	return (
		<div className="flex h-dvh overflow-hidden">
			<Sidebar
				unreadCount={unreadCount}
				onToggleSearch={onToggleSearch}
				onToggleNotifications={onToggleNotifications}
				onNavigate={onNavigate}
			/>
			<main className="flex grow overflow-hidden bg-secondary/10">
				{isChatConversation ? (
					<div className="flex h-full w-full flex-col">{content}</div>
				) : (
					<div className="flex h-full w-full justify-center p-6">
						<div className="flex h-full w-full max-w-[420px] flex-col">
							{content}
						</div>
					</div>
				)}
			</main>
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
		</div>
	)
}
