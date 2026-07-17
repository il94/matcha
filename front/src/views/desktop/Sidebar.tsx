import { Link, useLocation } from "react-router"
import {
	BellIcon,
	HouseIcon,
	LogOutIcon,
	MessageCircleIcon,
	Settings2Icon,
	UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import ChatList from "@/components/ChatList"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
	{ to: "/home", Icon: HouseIcon },
	{ to: "/chat", Icon: MessageCircleIcon },
	{ to: "/profile", Icon: UserIcon },
]

type SidebarProps = {
	unreadCount: number
	onToggleSearch: () => void
	onToggleNotifications: () => void
	onNavigate: () => void
}

export default function Sidebar({
	unreadCount,
	onToggleSearch,
	onToggleNotifications,
	onNavigate,
}: SidebarProps) {
	const { logout } = useAuthOutletContext()
	const { pathname } = useLocation()

	return (
		<aside className="flex h-dvh w-[360px] shrink-0 flex-col border-r border-button">
			<div className="flex h-12 shrink-0 items-center justify-between bg-primary px-3">
				<Link
					to="/home"
					onClick={onNavigate}
					className="flex items-center gap-1.5"
				>
					<img src="/favicon.ico" alt="Logo" className="h-6" />
					<p className="text-lg text-text">matcha</p>
				</Link>
				<div className="flex gap-3">
					<Button
						onClick={onToggleNotifications}
						size="icon"
						variant="ghost"
						className="relative size-6 hover:bg-black/15"
					>
						<BellIcon className="text-black" />
						{unreadCount > 0 && (
							<span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-pink-600 ring-2 ring-primary" />
						)}
					</Button>
					<Button
						onClick={onToggleSearch}
						size="icon"
						variant="ghost"
						className="size-6 hover:bg-black/15"
					>
						<Settings2Icon className="text-black" />
					</Button>
					<Button
						onClick={logout}
						size="icon"
						variant="ghost"
						className="size-6 hover:bg-black/15"
					>
						<LogOutIcon className="text-black" />
					</Button>
				</div>
			</div>
			<ChatList
				emptyMessage="No conversation yet. Say hi to one of your matches !"
				className="grow"
			/>
			<nav className="flex h-14 shrink-0 items-center justify-evenly bg-secondary">
				{NAV_ITEMS.map(({ to, Icon }) => {
					const isActive = pathname === to || pathname.startsWith(`${to}/`)

					return (
						<Button
							key={to}
							asChild
							size="icon"
							variant="ghost"
							className={cn(
								"hover:bg-black/15",
								isActive && "bg-black/15 hover:bg-black/15",
							)}
						>
							<Link to={to} onClick={onNavigate}>
								<Icon className="size-8 text-black" />
							</Link>
						</Button>
					)
				})}
			</nav>
		</aside>
	)
}
