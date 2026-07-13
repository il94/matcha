import axios from "@/lib/axios"

export default async function getNotifications() {
	// TODO Gestion d'erreur
	const response = await axios.get<Notification[]>(`/user/notifications`)

	return response.data
}
