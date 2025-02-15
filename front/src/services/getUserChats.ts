import axios from "axios"

export default async function getUserChats() {
	// TODO Gestion d'erreur
	const response = await axios.get<Chat[]>(
		`${import.meta.env.VITE_API_BACK_URL}/user/chats`,
	)

	return response.data
}
