import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, MapPinned } from "lucide-react"

function Chat() {
	return (
		<div className="flex items-center gap-x-2.5 py-2">
			<img
				src="/model.JPG"
				className="size-14 shrink-0 rounded-full object-cover"
			/>
			<div className="w-full overflow-hidden text-sm">
				<p className="font-bold">Loremosowddsd</p>
				<div className="flex">
					<p className="truncate">
						Salut c'est chouf lis mon message stp tu reponds pas ou quoi haha
						bon c bon la
					</p>
					<p className="shrink-0">&nbsp;·&nbsp;3d</p>
				</div>
			</div>
		</div>
	)
}

export default function ChatPage() {
	return (
		<div className="flex h-full flex-col overflow-y-hidden">
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
			<ScrollArea className="my-4 overflow-y-scroll px-3">
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
				<Chat />
			</ScrollArea>
		</div>
	)
}
