import { Button } from "@/components/ui/button"
import useDebouncedCallback from "@/hooks/useDebouncedCallback"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import Step4LocationDialog from "./Step4LocationDialog"
import InputSelect from "@/components/InputSelect"
import getLocationByIP from "@/services/getLocationByIP"
import getLocationByCoordinates from "@/services/getLocationByCoordinates"
import getLocationSuggestions from "@/services/getLocationSuggestions"

export default function Step4() {
	const { data } = useQuery({
		queryKey: ["ipLocation"],
		queryFn: getLocationByIP,
	})

	const ipLocation = useMemo(() => {
		if (!data) return "Loading location..."
		return data.locationLabel || "Unknown location"
	}, [data])

	const form = useFormContext()

	const [enableLocationButton, setEnableLocationButton] = useState(false)
	useEffect(() => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			if (result.state === "granted" || result.state === "prompt")
				setEnableLocationButton(true)
			else setEnableLocationButton(false)
		})
	}, [])

	const [input, setInput] = useState("")

	const getLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords

				const locationLabel = await getLocationByCoordinates({
					latitude,
					longitude,
				})

				setInput(locationLabel)
				setSuggestions(undefined)
				form.setValue("locationLabel", locationLabel)
				form.setValue("latitude", latitude)
				form.setValue("longitude", longitude)
			},
			() => {
				setEnableLocationButton(false)
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
			return
		}

		const suggestions = await getLocationSuggestions({
			label: input,
		})

		setSuggestions(suggestions)
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
		<div className="flex max-w-full flex-col gap-10">
			<h1 className="text-4xl">Where are you ?</h1>
			<div className="flex w-full flex-col gap-6">
				<p>
					Sharing your location allows us to suggest more relevant matches based
					on geographic proximity. You can always adjust or disable it later in
					your profile settings.&nbsp;
					<Step4LocationDialog />
				</p>
				<Button
					onClick={getLocation}
					type="button"
					disabled={!enableLocationButton}
					className="disabled:bg-accent"
				>
					{enableLocationButton
						? "Use my current location"
						: "Location access denied"}
				</Button>

				<InputSelect
					onInput={handleInputChange}
					onSelect={handleSelectSuggestion}
					input={input}
					items={suggestions}
					placeholder={ipLocation}
					className={cn(
						"min-h-20",
						((suggestions ?? []).length > 0 || input.length > 0) &&
							"rounded-b-none",
					)}
				/>
			</div>
		</div>
	)
}
