import axios from "@/lib/axios"

type GetLocationSuggestions = {
	label: string
}

export default async function getLocationSuggestions({
	label,
}: GetLocationSuggestions) {
	// TODO Gestion d'erreur
	const response = await axios.get(`/location/search`, {
		params: {
			label,
		},
	})

	return response.data
}
