import { Button } from "@/components/ui/button"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import { BellIcon, LogOutIcon, Settings2Icon } from "lucide-react"

type HeaderNavbarProps = {
	onOpenSearch: () => void
}

export default function HeaderNavbar({ onOpenSearch }: HeaderNavbarProps) {
	const { logout } = useAuthOutletContext()

	return (
		<nav className="flex h-12 shrink-0 items-center justify-between bg-primary px-3">
			<div className="flex items-center gap-1.5">
				<img src="/favicon.ico" alt="Logo" className="h-6" />
				<p className="text-lg text-text">matcha</p>
			</div>
			<div className="flex gap-3">
				<Button size="icon" variant="ghost" className="size-6">
					<BellIcon className="text-black" />
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
