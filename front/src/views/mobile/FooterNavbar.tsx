import { HouseIcon, MessageCircleIcon, UserIcon } from "lucide-react"

export default function FooterNavbar() {
	return (
		<nav className="flex h-14 shrink-0 items-center justify-evenly bg-secondary">
			<HouseIcon className="size-8 text-black" />
			<MessageCircleIcon className="size-8 text-black" />
			<UserIcon className="size-8 text-black" />
		</nav>
	)
}
