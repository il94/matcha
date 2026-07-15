import axios from "@/lib/axios"

export default async function getUserChats() {
	const response = await axios.get<Chat[]>(`/user/chats`)

	return response.data
}
