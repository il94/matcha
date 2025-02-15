import { Button } from "@/components/ui/button"
import { HouseIcon, MessageCircleIcon, UserIcon } from "lucide-react"
import { Link } from "react-router"

export default function FooterNavbar() {
	return (
		<nav className="flex h-14 shrink-0 items-center justify-evenly bg-secondary">
			<Button asChild size="icon" variant="secondary">
				<Link to="/home">
					<HouseIcon className="size-8 text-black" />
				</Link>
			</Button>
			<Button asChild size="icon" variant="secondary">
				<Link to="/chat">
					<MessageCircleIcon className="size-8 text-black" />
				</Link>
			</Button>
			<Button asChild size="icon" variant="secondary">
				<Link to="/profile">
					<UserIcon className="size-8 text-black" />
				</Link>
			</Button>
		</nav>
	)
}
