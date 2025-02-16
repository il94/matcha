import axios from "@/lib/axios"

export default async function logout() {
	await axios.delete(`/logout`)
}
