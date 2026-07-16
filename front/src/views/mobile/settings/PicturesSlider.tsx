import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import InputImageFileField from "@/components/FormFields/InputImageFileField"
import { useState } from "react"
import toast from "@/lib/toast"
import updateUserPictures from "@/services/updateUserPictures"
import { AxiosError } from "axios"

const formSchema = z.object({
	principalPicture: z.union([
		z.string(),
		z.instanceof(Blob, {
			message: "A picture is worth a thousand words, don't skip this one !",
		}),
	]),
	secondaryPicture1: z.union([z.string(), z.instanceof(Blob)]).optional(),
	secondaryPicture2: z.union([z.string(), z.instanceof(Blob)]).optional(),
	secondaryPicture3: z.union([z.string(), z.instanceof(Blob)]).optional(),
	secondaryPicture4: z.union([z.string(), z.instanceof(Blob)]).optional(),
})

type PicturesSliderProps = {
	initialValue: {
		principalPicture?: string
		secondaryPicture1?: string
		secondaryPicture2?: string
		secondaryPicture3?: string
		secondaryPicture4?: string
	}
	onClose: () => void
	className?: string
}

export default function PicturesSlider({
	onClose,
	className,
	initialValue,
}: PicturesSliderProps) {
	const queryClient = useQueryClient()

	const [picturesState, setPicturesState] = useState(() => {
		let count = 0
		if (initialValue.principalPicture) count++
		if (initialValue.secondaryPicture1) count++
		if (initialValue.secondaryPicture2) count++
		if (initialValue.secondaryPicture3) count++
		if (initialValue.secondaryPicture4) count++
		return count
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			principalPicture: initialValue.principalPicture,
			secondaryPicture1: initialValue.secondaryPicture1,
			secondaryPicture2: initialValue.secondaryPicture2,
			secondaryPicture3: initialValue.secondaryPicture3,
			secondaryPicture4: initialValue.secondaryPicture4,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUserPictures,
		onSuccess: () => {
			toast.success("Pictures successfully updated !")
			queryClient.invalidateQueries({ queryKey: ["verify"] })
			onClose()
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (
				error.response?.status === 400 &&
				(error.response.data.message === "INVALID_PICTURE_URL" ||
					error.response.data.message === "INVALID_PICTURE_URL_2")
			) {
				form.setError("root", {
					message: "That picture didn't quite make it. Try uploading it again !",
				})
			} else {
				form.setError("root", {
					message:
						"Looks like something went wrong. Don't worry, we're on it, try again shortly.",
				})
			}
		},
	})

	const message = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						updateUserMutation({
							principalPicture: values.principalPicture,
							secondaryPicture1: values.secondaryPicture1,
							secondaryPicture2: values.secondaryPicture2,
							secondaryPicture3: values.secondaryPicture3,
							secondaryPicture4: values.secondaryPicture4,
						}),
					)}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Photos</h2>
							<p className="text-sm text-muted-foreground">
								Your photos are the first thing others see. Make a great
								impression by choosing pictures that truly represent you.
							</p>
						</div>

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
									initialValue={initialValue.principalPicture}
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
										initialValue={initialValue.secondaryPicture1}
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
										initialValue={initialValue.secondaryPicture2}
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
										initialValue={initialValue.secondaryPicture3}
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
										initialValue={initialValue.secondaryPicture4}
										withClearButton={picturesState === 5}
										disabled={picturesState < 4}
										className={cn(
											"flex h-24 w-14 items-center justify-center overflow-hidden rounded-lg border-[3px] border-dashed border-muted-foreground p-0 disabled:opacity-50",
											picturesState > 4 && "border-none",
										)}
									/>
								</div>
							</div>
							<FormMessage className="h-5 px-1">{message}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							isPending ||
							!form.formState.isValid ||
							picturesState === 0 ||
							(initialValue.principalPicture ===
								form.getValues().principalPicture &&
								initialValue.secondaryPicture1 ===
									form.getValues().secondaryPicture1 &&
								initialValue.secondaryPicture2 ===
									form.getValues().secondaryPicture2 &&
								initialValue.secondaryPicture3 ===
									form.getValues().secondaryPicture3 &&
								initialValue.secondaryPicture4 ===
									form.getValues().secondaryPicture4)
						}
					>
						{isPending && <Loader2Icon className="animate-spin" />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
