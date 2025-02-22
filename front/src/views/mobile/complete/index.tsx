import { Button } from "@/components/ui/button"
import complete from "@/services/complete"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router"
import { z } from "zod"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { FormMessage } from "@/components/ui/form"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"
import dayjs from "@/lib/dayjs"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"

export const formSchema = z.object({
	birthDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Every story has a timeline—choose a date that makes sense.",
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
		message: "Gender is part of your identity—pick what feels right.",
		required_error: "Everyone has a story—let's start with your gender.",
	}),
	sexualOrientation: z.nativeEnum(SexualOrientation, {
		message: "Love is love—choose what best represents you.",
		required_error: "Everyone has a type—don't leave this blank !",
	}),
	tags: z.array(z.number()),
	bio: z.string().max(256, "Keep it short and impactful—get to the point !"),
	principalPicture: z.instanceof(Blob, {
		message: "A picture is worth a thousand words—don't skip this one !",
	}),
	secondaryPicture1: z.instanceof(Blob).optional(),
	secondaryPicture2: z.instanceof(Blob).optional(),
	secondaryPicture3: z.instanceof(Blob).optional(),
	secondaryPicture4: z.instanceof(Blob).optional(),
})

export default function CompletePage() {
	const { logout } = useAuthOutletContext()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tags: [],
			bio: "",
		},
		mode: "onChange",
	})

	const navigate = useNavigate()

	const { mutate: completeMutation } = useMutation({
		mutationFn: complete,
		onSuccess: () => {
			navigate("/home")
		},
	})

	const [searchParams, setSearchParams] = useSearchParams()
	const currentStep = Number(searchParams.get("step")) || 1

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
					<FormMessage className="px-1">{error}</FormMessage>

					<div className="flex w-full flex-col items-center pb-12">
						<Button
							onClick={
								currentStep < 3 ? () => changeStep(currentStep + 1) : undefined
							}
							variant="dark"
							size="lg"
							className="font-semibold"
							type={currentStep < 3 ? "button" : "submit"}
							disabled={
								currentStep === 1
									? !watched.birthDate ||
										!watched.gender ||
										!watched.sexualOrientation
									: currentStep === 2
										? watched.bio.length > 256
										: currentStep === 3
											? watched.principalPicture === undefined
											: true
							}
						>
							{currentStep < 3 ? "Next" : "Submit"}
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
