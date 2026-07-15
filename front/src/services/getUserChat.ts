import axios from "@/lib/axios"

type getUserChatParams = {
	chatId: Chat["id"]
}

export default async function getUserChat({ chatId }: getUserChatParams) {
	const response = await axios.get<Chat>(`/chat/${chatId}`)

	return response.data
}
