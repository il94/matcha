import { HeartIcon, MapPinIcon, XIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import { motion } from "motion/react"

export default function Home() {
	return (
		<div className="flex grow flex-col justify-between bg-background px-3 py-3">
			<div className="relative grow overflow-hidden rounded-lg">
				<img src="/model.JPG" className="absolute size-full object-cover" />
				<div className="absolute bottom-0 flex h-48 w-full flex-col justify-end bg-gradient-to-b from-transparent to-background p-3">
					<p className="text-3xl">
						Loremosowddsd <span className="text-2xl">27</span>
					</p>
					<div className="flex items-center gap-1.5">
						<MapPinIcon className="size-4" />
						<p>à 8 kilomètres</p>
					</div>
					<div className="relative flex items-center gap-2 pl-0.5">
						<motion.div
							className="relative z-10 size-3 overflow-hidden rounded-full bg-gradient-to-tr from-green-500 to-green-200"
							animate={{ backgroundPositionX: "100%" }}
							transition={{
								backgroundPositionX: {
									repeat: Infinity,
									repeatType: "mirror",
									duration: 0.5,
									ease: "easeInOut",
								},
							}}
							style={{ backgroundSize: "200%" }}
						/>
						<motion.div
							className="opacity-0.5 absolute left-2 -translate-x-1/2 rounded-full border-2 border-green-300 p-0"
							animate={{ padding: "10px", opacity: 0 }}
							transition={{
								padding: {
									repeat: Infinity,
									duration: 1.25,
								},
								opacity: {
									repeat: Infinity,
									duration: 1.25,
									ease: "easeInOut",
									delay: 0.5,
								},
							}}
						/>
						<p>En ligne</p>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-evenly">
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<XIcon className="size-10 stroke-red-400 stroke-[3.5]" />
				</Button>
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<motion.div
						animate={{ scale: 1.2 }}
						transition={{
							repeat: Infinity,
							repeatType: "mirror",
							duration: 0.75,
						}}
					>
						<HeartIcon className="size-10 fill-red-400 stroke-emerald-500 stroke-[3.5]" />
					</motion.div>
				</Button>
			</div>
		</div>
	)
}
