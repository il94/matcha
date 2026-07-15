import axios from "@/lib/axios"

export default async function markNotificationsRead() {
	await axios.patch(`/user/notifications/read`)
}
