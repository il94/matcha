import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import useDebouncedCallback from "@/hooks/useDebouncedCallback"
import { cn } from "@/lib/utils"
import getGeolocation from "@/services/getLocationByCoordinates"
import getLocationByIP from "@/services/getLocationByIP"
import getGeolocationSearch from "@/services/getLocationSuggestions"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import Step4LocationDialog from "./Step4LocationDialog"

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

				const locationLabel = await getGeolocation({ latitude, longitude })

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

		const suggestions = await getGeolocationSearch({
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

	const [isFocusInput, setIsFocusInput] = useState(false)

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
				<div
					className={cn(
						"flex max-w-full flex-col overflow-hidden rounded-lg",
						isFocusInput && "outline-none ring-1 ring-ring",
					)}
				>
					<Textarea
						onInput={handleInputChange}
						onFocus={() => setIsFocusInput(true)}
						onBlur={() => setIsFocusInput(false)}
						value={input}
						placeholder={`${ipLocation}`}
						autoSize
						className={cn(
							"h-[78px] text-sm",
							((suggestions ?? []).length > 0 || input.length > 0) &&
								"rounded-b-none",
						)}
					/>
					{suggestions?.map((suggestion, index) => (
						<Button
							key={index}
							onClick={() => handleSelectSuggestion(suggestion)}
							type="button"
							variant="outline"
							className={cn(
								"justify-start rounded-none px-3 py-1 last:rounded-b-lg",
							)}
						>
							<p className="truncate">{suggestion}</p>
						</Button>
					))}

					{suggestions?.length === 0 && (
						<Button
							type="button"
							variant="outline"
							disabled
							className={cn(
								"justify-start rounded-none px-3 py-1 last:rounded-b-lg",
							)}
						>
							<p className="truncate">No results found</p>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
