import { HeartIcon, XIcon } from "lucide-react"
import { Button } from "./components/ui/button"

export default function Home() {
	return (
		<div className="flex grow flex-col justify-between bg-background px-3 py-1.5">
			<div className="relative grow overflow-hidden rounded-lg">
				<img src="/model.JPG" className="absolute size-full object-cover" />
				<div className="absolute bottom-0 flex h-48 w-full flex-col justify-end bg-gradient-to-b from-transparent to-background">
					<p>Loremosowddsd 27</p>
					<p>Loremosowddsd 27</p>
					<p>Loremosowddsd 27</p>
				</div>
			</div>
			<div className="flex w-full items-center justify-evenly">
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<XIcon className="size-10 stroke-red-400 stroke-[3.5]" />
				</Button>
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<HeartIcon className="size-10 fill-red-400 stroke-emerald-500 stroke-[3.5]" />
				</Button>
			</div>
		</div>
	)
}
