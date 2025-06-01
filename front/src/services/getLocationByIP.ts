import axios from "@/lib/axios"

export default async function getLocationByIP() {
	// TODO Gestion d'erreur
	const response = await axios.get(`/location/ip`)

	return response.data
}
