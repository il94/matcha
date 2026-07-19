import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import updateUser from "@/services/updateUser"
import toast from "@/lib/toast"
import Step4LocationDialog from "../complete/Step4LocationDialog"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import InputSelect from "@/components/InputSelect"
import useDebouncedCallback from "@/hooks/useDebouncedCallback"
import getLocationByCoordinates from "@/services/getLocationByCoordinates"
import getLocationSuggestions from "@/services/getLocationSuggestions"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { AxiosError } from "axios"

export const formSchema = z.object({
	longitude: z.number().optional(),
	latitude: z.number().optional(),
	locationLabel: z
		.string()
		.max(256, "That location name is a bit long, keep it under 256 characters.")
		.optional(),
})

type LocationSliderProps = {
	initialValue: {
		locationLabel: User["locationLabel"]
		locationSource: User["locationSource"]
	}
	onClose: () => void
	className?: string
}

export default function LocationSlider({
	initialValue,
	onClose,
	className,
}: LocationSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			locationLabel: initialValue.locationLabel,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Location successfully updated !")
			queryClient.invalidateQueries({ queryKey: ["verify"] })
			queryClient.resetQueries({ queryKey: ["users"] })
			onClose()
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (
				error.response?.status === 400 &&
				error.response.data.message === "LOCATION_REQUIRED"
			) {
				form.setError("root", {
					message:
						"Looks like you haven't set a location yet. Add one to keep going !",
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

	const [enableLocationButton, setEnableLocationButton] = useState(false)
	useEffect(() => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			if (result.state === "granted" || result.state === "prompt")
				setEnableLocationButton(true)
			else setEnableLocationButton(false)
		})
	}, [])

	const [input, setInput] = useState(initialValue.locationLabel)
	const [isLocating, setIsLocating] = useState(false)
	const [isSearching, setIsSearching] = useState(false)

	const getLocation = useCallback(() => {
		setIsLocating(true)
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords

				try {
					const locationLabel = await (DEBUG_ERRORS.locationByCoordinates
						? forcedError()
						: getLocationByCoordinates({ latitude, longitude }))

					setInput(locationLabel)
					setSuggestions(undefined)
					form.setValue("locationLabel", locationLabel)
					form.setValue("latitude", latitude)
					form.setValue("longitude", longitude)
				} catch {
					toast.error("We couldn't pin down your location. Try again !")
				} finally {
					setIsLocating(false)
				}
			},
			() => {
				setEnableLocationButton(false)
				setIsLocating(false)
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			},
		)
	}, [form])

	const [suggestions, setSuggestions] = useState<string[]>()
	const getSuggestions = useDebouncedCallback(async (input: string) => {
		if (input.trim().length === 0) {
			setSuggestions(undefined)
			setIsSearching(false)
			return
		}

		setIsSearching(true)
		try {
			const suggestions = await (DEBUG_ERRORS.locationSuggestions
				? forcedError()
				: getLocationSuggestions({ label: input }))

			setSuggestions(suggestions)
		} catch {
			setSuggestions(undefined)
			toast.error(
				"We couldn't find any matching places. Try typing something else !",
			)
		} finally {
			setIsSearching(false)
		}
	}, 500)

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			setInput(event.target.value)
			form.setValue(
				"locationLabel",
				event.target.value.length !== 0 ? "typing" : event.target.value,
			)
			form.setValue("latitude", undefined)
			form.setValue("longitude", undefined)

			getSuggestions(event.target.value)
		},
		[getSuggestions, form],
	)

	const handleSelectSuggestion = useCallback(
		(suggestion: string) => {
			form.setValue("locationLabel", suggestion)
			form.setValue("latitude", undefined)
			form.setValue("longitude", undefined)

			setSuggestions(undefined)
			setInput(suggestion)
		},
		[form],
	)

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						updateUserMutation({
							latitude: values.latitude,
							longitude: values.longitude,
							locationLabel: values.locationLabel,
						}),
					)}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Location</h2>
							<p className="text-sm text-muted-foreground">
								Sharing your location allows us to suggest more relevant matches
								based on geographic proximity. You can always adjust or disable
								it later in your profile settings.&nbsp;
								<Step4LocationDialog />
							</p>
						</div>

						<Button
							onClick={getLocation}
							type="button"
							disabled={!enableLocationButton || isLocating}
							className="disabled:bg-accent"
						>
							{isLocating && <Loader2Icon className="animate-spin" />}
							{enableLocationButton
								? "Use my current location"
								: "Location access denied"}
						</Button>
						<InputSelect
							onInput={handleInputChange}
							onSelect={handleSelectSuggestion}
							input={input}
							items={suggestions}
							isLoading={isSearching}
							placeholder="Enter your city or neighbourhood"
							className={cn(
								"min-h-20",
								((suggestions ?? []).length > 0 || input.length > 0) &&
									"rounded-b-none",
							)}
						/>

						<FormMessage className="h-5 px-1">{message}</FormMessage>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							isPending ||
							!form.formState.isValid ||
							form.getValues().locationLabel === "typing" ||
							form.getValues().locationLabel === initialValue.locationLabel
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
