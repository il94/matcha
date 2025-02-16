import axios from "@/lib/axios"

export default async function verify() {
	// TODO Gestion d'erreur
	const response = await axios.get(`/verify`)

	return response.data
}
