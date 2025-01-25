import AnimateHalo from "@/components/AnimateHalo"
import { cn } from "@/lib/utils"
import { MapPinIcon } from "lucide-react"
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"

type ImagesSectionProps = {
	firstName: string
	age: number
	location: string
	status: string
	images: string[]
}

export default function ImagesSection({
	firstName,
	age,
	location,
	status,
	images,
}: ImagesSectionProps) {
	const [displayedImage, setDisplayedImage] = useState(0)
	const [height, setHeight] = useState(0)

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

	const sectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!sectionRef.current || !sectionRef.current.parentElement) return

		const sectionParent = sectionRef.current.parentElement

		const resizeObserver = new ResizeObserver(() =>
			setHeight(sectionParent.offsetHeight),
		)

		resizeObserver.observe(sectionParent)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	return (
		<section
			onClick={handleImageClick}
			className="relative grow overflow-hidden rounded-lg"
			style={{ height }}
			onResize={() => console.log("Test")}
			ref={sectionRef}
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
					{firstName} <span className="text-2xl">{age}</span>
				</p>
				<div className="flex items-center gap-2">
					<MapPinIcon className="ml-0.5 size-4" />
					<p>{location}</p>
				</div>
				<div className="flex items-center gap-2 pl-0.5">
					<AnimateHalo size={4} />
					<p>{status}</p>
				</div>
			</div>
		</section>
	)
}
