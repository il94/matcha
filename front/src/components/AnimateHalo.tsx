import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const sizes = [
	"size-1",
	"size-2",
	"size-3",
	"size-4",
	"size-5",
	"size-6",
	"size-7",
	"size-8",
	"size-9",
	"size-10",
]

const borders = [
	"border-1",
	"border-2",
	"border-[3px]",
	"border-4",
	"border-[5px]",
	"border-[6px]",
	"border-[7px]",
	"border-8",
	"border-[9px]",
	"border-[10px]",
]

type AnimateHaloProps = {
	size?: number
	className?: string
}

export default function AnimateHalo({ size, className }: AnimateHaloProps) {
	return (
		<div className={cn("relative size-4", className, size && sizes[size - 1])}>
			<motion.div
				className="absolute left-1/2 top-1/2 z-10 size-2/3 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-gradient-to-tr from-green-500 to-green-200"
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
				className={cn(
					"opacity-0.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-300 p-0",
					size && borders[Math.floor(size / 2)],
				)}
				animate={{ padding: "65%", opacity: 0 }}
				transition={{
					padding: {
						repeat: Infinity,
						duration: 1,
						delay: 0.25,
					},
					opacity: {
						repeat: Infinity,
						duration: 1,
						ease: "easeInOut",
						delay: 0.5,
					},
				}}
			/>
		</div>
	)
}
