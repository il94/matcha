import axios from "axios"

type getUserParams = {
	userId: User["id"]
}

export default async function getUser({
	userId,
}: getUserParams): Promise<User> {
	// TODO Gestion d'erreur
	const response = await axios.get<User>(
		`${import.meta.env.VITE_API_BACK_URL}/user/${userId}`,
	)

	return response.data
}
