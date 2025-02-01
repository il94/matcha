import axios from "axios"

export default async function getTags(): Promise<Tag[]> {
	// TODO Gestion d'erreur
	const response = await axios.get<Tag[]>(
		`${import.meta.env.VITE_API_BACK_URL}/tags`,
	)

	return response.data
}
