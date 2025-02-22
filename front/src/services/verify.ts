import axios from "@/lib/axios"

type verifyReturn = {
	userId: User["id"]
	isAuthenticated: boolean
	isCompleting?: boolean
	isReseting?: boolean
}

export default async function verify() {
	// TODO Gestion d'erreur
	const response = await axios.get<verifyReturn>(`/verify`)

	return response.data
}
