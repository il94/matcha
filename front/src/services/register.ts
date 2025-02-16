import axios from "@/lib/axios"

type registerParams = {
	email: string
	firstName: string
	lastName: string
	username: string
	password: string
}

export default async function register({
	email,
	firstName,
	lastName,
	username,
	password,
}: registerParams) {
	const response = await axios.post(`/register`, {
		email,
		firstName,
		lastName,
		username,
		password,
	})

	return response.data
}
