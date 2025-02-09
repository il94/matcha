import axios from "axios"

type getUserChatParams = {
	chatId: Chat["id"]
}

export default async function getUserChat({ chatId }: getUserChatParams) {
	// TODO Gestion d'erreur
	const response = await axios.get<Chat>(
		`${import.meta.env.VITE_API_BACK_URL}/chat/${chatId}`,
	)

	return response.data
}
