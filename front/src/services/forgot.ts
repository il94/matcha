import axios from "@/lib/axios"

type forgotParams = {
	email: User["email"]
}

export default async function forgot({ email }: forgotParams) {
	const response = await axios.post(`/forgot`, {
		email,
	})

	return response.data
}
