import AnimateHalo from "@/components/AnimateHalo"
import { cn } from "@/lib/utils"
import { MapPinIcon } from "lucide-react"
import { MouseEvent, useCallback, useMemo, useState } from "react"

export default function ImagesSection() {
	const [displayedImage, setDisplayedImage] = useState(0)

	const images = useMemo(
		() => ["/model.JPG", "/model_2.JPG", "/model_3.JPG"],
		[],
	)

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
		<section
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
				<div className="flex items-center gap-2">
					<MapPinIcon className="ml-0.5 size-4" />
					<p>à 8 kilomètres</p>
				</div>
				<div className="flex items-center gap-2 pl-0.5">
					<AnimateHalo size={4} />
					<p>En ligne</p>
				</div>
			</div>
		</section>
	)
}
