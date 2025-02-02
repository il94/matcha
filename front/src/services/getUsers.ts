import { insertQueryParams } from "@/lib/insertQueryParams"
import axios from "axios"

type getUsersParams = {
	page?: number
	limit?: number
}

export default async function getUsers({
	page,
	limit,
}: getUsersParams): Promise<{
	users: User[]
	nextPage: number | null
}> {
	// TODO Gestion d'erreur
	const response = await axios.get<{ users: User[]; nextPage: number | null }>(
		`${import.meta.env.VITE_API_BACK_URL}/users?${insertQueryParams({ page, limit })}`,
	)

	return response.data
}
