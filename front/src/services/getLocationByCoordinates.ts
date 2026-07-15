import axios from "@/lib/axios"

type GetLocationByCoordinatesParams = {
	latitude: number
	longitude: number
}

export default async function getLocationByCoordinates({
	latitude,
	longitude,
}: GetLocationByCoordinatesParams) {
	const response = await axios.get(`/location`, {
		params: {
			latitude,
			longitude,
		},
	})

	return response.data
}
