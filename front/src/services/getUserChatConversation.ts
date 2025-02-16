import axios from "@/lib/axios"

type getUserChatConversationParams = {
	chatId: Chat["id"]
}

export default async function getUserChatConversation({
	chatId,
}: getUserChatConversationParams) {
	// TODO Gestion d'erreur
	const response = await axios.get<Chat>(`/chat/${chatId}/conversation`)

	return response.data
}
