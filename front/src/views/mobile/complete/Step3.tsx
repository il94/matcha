import InputImageFileField from "@/components/FormFields/InputImageFileField"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

export default function Step3() {
	const form = useFormContext()
	const [picturesState, setPicturesState] = useState(0)

	return (
		<div className="flex flex-col gap-10">
			<h1 className="text-4xl">Let Them See You</h1>
			<div className="flex w-full flex-col gap-6">
				<p>
					Your photos are the first thing others see. Make a great impression by
					choosing pictures that truly represent you.
				</p>
				<div className="flex flex-col items-center justify-center gap-4">
					<div className="relative">
						<InputImageFileField
							control={form.control}
							onChange={(event) => {
								if (event && picturesState < 1) {
									setPicturesState(picturesState + 1)
								}
								form.clearErrors()
							}}
							name="principalPicture"
							className={cn(
								"flex h-40 max-h-40 min-h-40 w-24 items-center justify-center overflow-hidden rounded-lg border-[3px] border-dashed border-muted-foreground p-0",
								picturesState > 0 && "border-none",
							)}
						/>
						{picturesState > 0 && (
							<p className="absolute top-0 w-full rounded-t-lg bg-primary text-center text-sm font-semibold">
								Your Star Pic
							</p>
						)}
					</div>

					<div className="flex w-full flex-wrap justify-center gap-2">
						<div className="flex gap-2">
							<InputImageFileField
								control={form.control}
								onChange={(event) => {
									if (event && picturesState < 2)
										setPicturesState(picturesState + 1)
									if (!event && picturesState === 2)
										setPicturesState(picturesState - 1)
									form.clearErrors()
								}}
								name="secondaryPicture1"
								withClearButton={picturesState === 2}
								disabled={picturesState < 1}
								className={cn(
									"flex h-24 w-14 items-center justify-center overflow-hidden rounded-lg border-[3px] border-dashed border-muted-foreground p-0 disabled:opacity-50",
									picturesState > 1 && "border-none",
								)}
							/>
							<InputImageFileField
								control={form.control}
								onChange={(event) => {
									if (event && picturesState < 3)
										setPicturesState(picturesState + 1)
									if (!event && picturesState === 3)
										setPicturesState(picturesState - 1)
									form.clearErrors()
								}}
								name="secondaryPicture2"
								withClearButton={picturesState === 3}
								disabled={picturesState < 2}
								className={cn(
									"flex h-24 w-14 items-center justify-center overflow-hidden rounded-lg border-[3px] border-dashed border-muted-foreground p-0 disabled:opacity-50",
									picturesState > 2 && "border-none",
								)}
							/>
						</div>
						<div className="flex gap-2">
							<InputImageFileField
								control={form.control}
								onChange={(event) => {
									if (event && picturesState < 4)
										setPicturesState(picturesState + 1)
									if (!event && picturesState === 4)
										setPicturesState(picturesState - 1)
									form.clearErrors()
								}}
								name="secondaryPicture3"
								withClearButton={picturesState === 4}
								disabled={picturesState < 3}
								className={cn(
									"flex h-24 w-14 items-center justify-center overflow-hidden rounded-lg border-[3px] border-dashed border-muted-foreground p-0 disabled:opacity-50",
									picturesState > 3 && "border-none",
								)}
							/>
							<InputImageFileField
								control={form.control}
								onChange={(event) => {
									if (event && picturesState < 5)
										setPicturesState(picturesState + 1)
									if (!event && picturesState === 5)
										setPicturesState(picturesState - 1)
									form.clearErrors()
								}}
								name="secondaryPicture4"
								withClearButton={picturesState === 5}
								disabled={picturesState < 4}
								className={cn(
									"flex h-24 w-14 items-center justify-center overflow-hidden rounded-lg border-[3px] border-dashed border-muted-foreground p-0 disabled:opacity-50",
									picturesState > 4 && "border-none",
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
