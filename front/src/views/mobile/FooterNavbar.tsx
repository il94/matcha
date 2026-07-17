import { Button } from "@/components/ui/button"
import { HouseIcon, MessageCircleIcon, UserIcon } from "lucide-react"
import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
	{ to: "/home", Icon: HouseIcon },
	{ to: "/chat", Icon: MessageCircleIcon },
	{ to: "/profile", Icon: UserIcon },
]

type FooterNavbarProps = {
	onNavigate?: () => void
}

export default function FooterNavbar({ onNavigate }: FooterNavbarProps) {
	const { pathname } = useLocation()

	return (
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
	)
}
