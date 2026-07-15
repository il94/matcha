import axios from "@/lib/axios"

type getUserChatConversationParams = {
	chatId: Chat["id"]
}

export default async function getUserChatConversation({
	chatId,
}: getUserChatConversationParams) {
	const response = await axios.get<Chat & Pick<User, "id">>(
		`/chat/${chatId}/conversation`,
	)

	return response.data
}
