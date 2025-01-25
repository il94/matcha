import { BellIcon, LogOutIcon, Settings2Icon } from "lucide-react"

export default function HeaderNavbar() {
	return (
		<nav className="flex h-12 shrink-0 items-center justify-between bg-primary px-3">
			<div className="flex items-center gap-1.5">
				<img src="/favicon.ico" alt="Logo" className="h-6" />
				<p className="text-lg text-text">matcha</p>
			</div>
			<div className="flex gap-3">
				<BellIcon className="text-black" />
				<Settings2Icon className="text-black" />
				<LogOutIcon className="text-black" />
			</div>
		</nav>
	)
}
