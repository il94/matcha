import axios from "@/lib/axios"

export default async function verify() {
	// TODO Gestion d'erreur
	const response = await axios.get<User["id"]>(`/verify`)

	return response.data
}
