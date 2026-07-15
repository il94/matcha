import axios from "@/lib/axios"

export default async function getNotifications() {
	const response = await axios.get<AppNotification[]>(`/user/notifications`)

	return response.data
}
