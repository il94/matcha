import axios from "@/lib/axios"

export default async function markNotificationsRead() {
	// TODO Gestion d'erreur
	await axios.patch(`/user/notifications/read`)
}
