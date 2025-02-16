import axios from "@/lib/axios"

export default async function getUserMe() {
	// TODO Gestion d'erreur
	const response = await axios.get<User>(`/user/me`)

	return response.data
}
