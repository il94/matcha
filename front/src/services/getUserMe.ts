import axios from "axios"

export default async function getUserMe() {
	// TODO Gestion d'erreur
	const response = await axios.get<User>(
		`${import.meta.env.VITE_API_BACK_URL}/user/me`,
	)

	return response.data
}
