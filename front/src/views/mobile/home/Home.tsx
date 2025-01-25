import { XIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import AnimateHeart from "@/components/AnimateHeart"
import ImagesSection from "./ImagesSection"
export default function Home() {
	return (
		<div className="flex h-full flex-col justify-between overflow-y-hidden bg-background px-3 py-3">
			<div className="no-scrollbar h-full overflow-y-scroll">
				<ImagesSection />
			</div>
			<div className="flex h-16 w-full items-center justify-evenly">
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<XIcon className="size-10 stroke-red-400 stroke-[3.5]" />
				</Button>
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<AnimateHeart />
				</Button>
			</div>
		</div>
	)
}
