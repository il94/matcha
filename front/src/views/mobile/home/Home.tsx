import { HeartIcon, MapPinIcon, XIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { motion } from "motion/react"
import { MouseEvent, useCallback, useMemo, useState } from "react"
import { cn } from "../../../lib/utils"

export default function Home() {
	/* ===== Temp values ===== */

	const images = useMemo(
		() => ["/model.JPG", "/model_2.JPG", "/model_3.JPG"],
		[],
	)

	/* ======================= */

	const [displayedImage, setDisplayedImage] = useState(0)

	const displayPreviousImage = useCallback(() => {
		if (displayedImage <= 0) return
		setDisplayedImage(displayedImage - 1)
	}, [displayedImage])

	const displayNextImage = useCallback(() => {
		if (displayedImage >= images.length - 1) return
		setDisplayedImage(displayedImage + 1)
	}, [displayedImage, images])

	const handleImageClick = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const { clientX, currentTarget } = event
			const clickPosition = clientX / currentTarget.offsetWidth

			if (clickPosition < 0.5) displayPreviousImage()
			else displayNextImage()
		},
		[displayPreviousImage, displayNextImage],
	)

	return (
		<div className="flex grow flex-col justify-between bg-background px-3 py-3">
			<div
				onClick={handleImageClick}
				className="relative grow overflow-hidden rounded-lg"
			>
				{images.map((image, index) => (
					<img
						key={`test_${index}`}
						src={image}
						className={cn(
							"absolute hidden size-full object-cover",
							index === displayedImage && "block",
						)}
					/>
				))}
				<div className="absolute top-2 flex h-1 w-full bg-background/20">
					{images.map((_, index) => (
						<div
							key={`image_${index}`}
							className={cn(
								"mx-0.5 h-full grow rounded-full bg-foreground",
								index !== displayedImage && "opacity-20",
							)}
						/>
					))}
				</div>
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
