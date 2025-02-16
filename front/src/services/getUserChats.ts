import axios from "@/lib/axios"

export default async function getUserChats() {
	// TODO Gestion d'erreur
	const response = await axios.get<Chat[]>(`/user/chats`)

	return response.data
}
