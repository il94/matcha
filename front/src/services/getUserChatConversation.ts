import axios from "axios"

type getUserChatConversationParams = {
	chatId: Chat["id"]
}

export default async function getUserChatConversation({
	chatId,
}: getUserChatConversationParams) {
	// TODO Gestion d'erreur
	const response = await axios.get<Chat>(
		`${import.meta.env.VITE_API_BACK_URL}/chat/${chatId}/conversation`,
	)

	return response.data
}
