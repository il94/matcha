import axios from "@/lib/axios"
import { insertQueryParams } from "@/lib/insertQueryParams"

type getUsersParams = {
	page?: number
	limit?: number
}

export default async function getUsers({ page, limit }: getUsersParams) {
	// TODO Gestion d'erreur
	const response = await axios.get<{ users: User[]; nextPage: number | null }>(
		`/users?${insertQueryParams({ page, limit })}`,
	)

	return response.data
}
