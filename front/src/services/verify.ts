import axios from "@/lib/axios"

type VerifyReturn = {
	userId: User["id"]
	user?: User
	isAuthenticated: boolean
	isCompleting?: boolean
	isReseting?: boolean
	isDemo?: boolean
}

export default async function verify() {
	const response = await axios.get<VerifyReturn>(`/verify`)

	return response.data
}
