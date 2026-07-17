import { Button } from "@/components/ui/button"
import { Calendar, MapPinned } from "lucide-react"
import ChatList from "@/components/ChatList"
import useIsDesktop from "@/hooks/useIsDesktop"

export default function ChatPage() {
	const isDesktop = useIsDesktop()

	// Sur desktop la liste vit dans la sidebar : le centre sert d'état vide.
	if (isDesktop)
		return (
			<div className="flex h-full items-center justify-center px-6">
				<p className="text-center text-sm opacity-50">
					Pick a conversation and keep the spark going !
				</p>
			</div>
		)

	return (
		<main className="flex h-full flex-col overflow-y-hidden">
			<div className="flex h-24 shrink-0 items-center justify-center gap-3 border-b border-b-button px-3">
				<Button variant="dark" className="h-11 w-full rounded-xl">
					<MapPinned />
					Discover
				</Button>
				<Button variant="dark" className="h-11 w-full rounded-xl">
					<Calendar />
					Dates
				</Button>
			</div>
			<ChatList />
		</main>
	)
}
