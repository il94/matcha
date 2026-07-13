import { Button } from "@/components/ui/button"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import { BellIcon, LogOutIcon, Settings2Icon } from "lucide-react"

type HeaderNavbarProps = {
	unreadCount: number
	onOpenNotifications: () => void
	onOpenSearch: () => void
}

export default function HeaderNavbar({
	unreadCount,
	onOpenNotifications,
	onOpenSearch,
}: HeaderNavbarProps) {
	const { logout } = useAuthOutletContext()

	return (
		<nav className="flex h-12 shrink-0 items-center justify-between bg-primary px-3">
			<div className="flex items-center gap-1.5">
				<img src="/favicon.ico" alt="Logo" className="h-6" />
				<p className="text-lg text-text">matcha</p>
			</div>
			<div className="flex gap-3">
				<Button
					onClick={onOpenNotifications}
					size="icon"
					variant="ghost"
					className="relative size-6"
				>
					<BellIcon className="text-black" />
					{unreadCount > 0 && (
						<span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-pink-600 ring-2 ring-primary" />
					)}
				</Button>
				<Button
					onClick={onOpenSearch}
					size="icon"
					variant="ghost"
					className="size-6"
				>
					<Settings2Icon className="text-black" />
				</Button>
				<Button onClick={logout} size="icon" variant="ghost" className="size-6">
					<LogOutIcon className="text-black" />
				</Button>
			</div>
		</nav>
	)
}
