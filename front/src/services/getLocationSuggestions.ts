import axios from "@/lib/axios"

type GetLocationSuggestions = {
	label: string
}

export default async function getLocationSuggestions({
	label,
}: GetLocationSuggestions) {
	const response = await axios.get(`/location/search`, {
		params: {
			label,
		},
	})

	return response.data
}
