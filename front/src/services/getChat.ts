import axios from "axios"

type getUserChatsParams = {
	userId: User["id"]
}

export default async function getUserChats({
	userId,
}: getUserChatsParams): Promise<
	(Chat & {
		title: User["firstName"]
		avatar: Image["name"]
		lastMessage: Message["content"]
	})[]
> {
	// TODO Gestion d'erreur
	const response = await axios.get<
		(Chat & {
			title: User["firstName"]
			avatar: Image["name"]
			lastMessage: Message["content"]
		})[]
	>(`${import.meta.env.VITE_API_BACK_URL}/user/${userId}/chats`)

	return response.data
}
