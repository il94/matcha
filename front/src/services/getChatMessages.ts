import axios from "axios"

type getChatMessagesParams = {
	chatId: Chat["id"]
}

export default async function getChatMessages({
	chatId,
}: getChatMessagesParams): Promise<Message[]> {
	// TODO Gestion d'erreur
	const response = await axios.get<Message[]>(
		`${import.meta.env.VITE_API_BACK_URL}/chat/${chatId}/messages`,
	)

	return response.data
}
