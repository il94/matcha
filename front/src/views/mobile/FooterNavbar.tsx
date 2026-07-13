import { Button } from "@/components/ui/button"
import { HouseIcon, MessageCircleIcon, UserIcon } from "lucide-react"
import { Link } from "react-router"

type FooterNavbarProps = {
	onNavigate?: () => void
}

export default function FooterNavbar({ onNavigate }: FooterNavbarProps) {
	return (
		<nav className="flex h-14 shrink-0 items-center justify-evenly bg-secondary">
			<Button asChild size="icon" variant="secondary">
				<Link to="/home" onClick={onNavigate}>
					<HouseIcon className="size-8 text-black" />
				</Link>
			</Button>
			<Button asChild size="icon" variant="secondary">
				<Link to="/chat" onClick={onNavigate}>
					<MessageCircleIcon className="size-8 text-black" />
				</Link>
			</Button>
			<Button asChild size="icon" variant="secondary">
				<Link to="/profile" onClick={onNavigate}>
					<UserIcon className="size-8 text-black" />
				</Link>
			</Button>
		</nav>
	)
}
