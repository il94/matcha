import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { InfoIcon } from "lucide-react"

export default function ActionButtonsDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" variant="ghost" className="size-12 rounded-full">
					<InfoIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>Hello</DialogContent>
		</Dialog>
	)
}
