import { HeartIcon } from "lucide-react"
import { motion } from "motion/react"

export default function AnimateHeart() {
	return (
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
	)
}
