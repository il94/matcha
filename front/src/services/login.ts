import axios from "@/lib/axios"

type loginParams = {
	username: string
	password: string
}

export default async function login({ username, password }: loginParams) {
	const response = await axios.post(`/login`, {
		username,
		password,
	})

	return response.data
}
