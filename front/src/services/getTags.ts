import axios from "@/lib/axios"

export default async function getTags() {
	// TODO Gestion d'erreur
	const response = await axios.get<Tag[]>(`/tags`)

	return response.data
}
