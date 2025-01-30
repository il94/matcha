import axios from "axios"

export default async function getUsers(): Promise<User[]> {
	const response = await axios.get<User[]>(`${import.meta.env.VITE_API_BACK_URL}/users`)

	return response.data
}
