import axios from "@/lib/axios"

export default async function publicLogout() {
	await axios.delete(`/public-logout`)
}
