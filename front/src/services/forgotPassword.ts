import axios from "@/lib/axios"

type forgotPasswordParams = {
	email: User["email"]
}

export default async function forgotPassword({ email }: forgotPasswordParams) {
	const response = await axios.post(`/forgot-password`, {
		email,
	})

	return response.data
}
