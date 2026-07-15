import { Button } from "@/components/ui/button"
import complete from "@/services/complete"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchParams } from "react-router"
import { z } from "zod"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { FormMessage } from "@/components/ui/form"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"
import dayjs from "@/lib/dayjs"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import useNavigateFrom from "@/hooks/useNavigateFrom"
import Step4 from "./Step4"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"

export const formSchema = z.object({
	birthDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Every story has a timeline, choose a date that makes sense.",
		})
		.refine(
			(value) => {
				return dayjs().diff(value, "year") >= 18
			},
			{
				message: "You must be at least 18 years old to use this app.",
			},
		),
	gender: z.nativeEnum(Gender, {
		message: "Gender is part of your identity, pick what feels right.",
		required_error: "Everyone has a story, let's start with your gender.",
	}),
	sexualOrientation: z.nativeEnum(SexualOrientation, {
		message: "Love is love, choose what best represents you.",
		required_error: "Everyone has a type, don't leave this blank !",
	}),
	tags: z.array(z.number()),
	bio: z.string().max(256, "Keep it short and impactful, get to the point !"),
	principalPicture: z.instanceof(Blob, {
		message: "A picture is worth a thousand words, don't skip this one !",
	}),
	secondaryPicture1: z.instanceof(Blob).optional(),
	secondaryPicture2: z.instanceof(Blob).optional(),
	secondaryPicture3: z.instanceof(Blob).optional(),
	secondaryPicture4: z.instanceof(Blob).optional(),
	longitude: z.number().optional(),
	latitude: z.number().optional(),
	locationLabel: z.string().optional(),
})

export default function CompletePage() {
	const MIN_STEP = 1
	const MAX_STEP = 4

	const { logout } = useAuthOutletContext()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tags: [],
			bio: "",
		},
		mode: "onChange",
	})

	const navigateFrom = useNavigateFrom()

	const { mutate: completeMutation, isPending } = useMutation({
		mutationFn: DEBUG_ERRORS.completeSubmit ? forcedError : complete,
		onSuccess: () => {
			navigateFrom("/home")
		},
		onError: () => {
			form.setError("root", {
				message:
					"Something went wrong while creating your profile. Please try again.",
			})
		},
	})

	const [searchParams, setSearchParams] = useSearchParams()
	const currentStep = Number(searchParams.get("step")) || MIN_STEP

	const changeStep = (newStep: number) => {
		const params = new URLSearchParams(searchParams)
		params.set("step", newStep.toString())
		setSearchParams(params)
	}

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			completeMutation(values)
		},
		[completeMutation],
	)

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	const watched = form.watch()

	return (
		<main className="h-dvh">
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex h-full w-full flex-col items-center justify-between px-9 pb-4 pt-10"
				>
					{currentStep === 1 && <Step1 />}
					{currentStep === 2 && <Step2 />}
					{currentStep === 3 && <Step3 />}
					{currentStep === 4 && <Step4 />}
					<FormMessage className="px-1">{error}</FormMessage>

					<div className="flex w-full flex-col items-center pb-12">
						<Button
							onClick={
								currentStep < MAX_STEP
									? () => changeStep(currentStep + 1)
									: undefined
							}
							variant="dark"
							size="lg"
							className={cn("font-semibold", isPending && "pl-4 pr-5")}
							type={currentStep < MAX_STEP ? "button" : "submit"}
							disabled={
								isPending ||
								(currentStep === 1
									? !watched.birthDate ||
										!watched.gender ||
										!watched.sexualOrientation
									: currentStep === 2
										? watched.bio.length > 256
										: currentStep === 3
											? watched.principalPicture === undefined
											: currentStep === 4
												? !watched.locationLabel ||
													watched.locationLabel === "typing"
												: true)
							}
						>
							{isPending && <Loader2Icon className="animate-spin" />}
							{currentStep < MAX_STEP ? "Next" : "Submit"}
						</Button>
						<Button
							onClick={logout}
							type="button"
							variant="darkLink"
							className="hover:text-destructive/70"
						>
							Logout
						</Button>
					</div>
				</form>
			</FormProvider>
		</main>
	)
}
