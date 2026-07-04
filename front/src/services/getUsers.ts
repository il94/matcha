import axios from "@/lib/axios"

type GetUsersParams = {
	page?: number
	limit?: number
	filters?: GetUsersFilters
}

function buildUsersQuery({ page, limit, filters = {} }: GetUsersParams) {
	const params = new URLSearchParams()

	if (page !== undefined) params.set("page", String(page))
	if (limit !== undefined) params.set("limit", String(limit))

	if (filters.minAge !== undefined) params.set("minAge", String(filters.minAge))
	if (filters.maxAge !== undefined) params.set("maxAge", String(filters.maxAge))
	if (filters.maxDistance !== undefined)
		params.set("maxDistance", String(filters.maxDistance))
	if (filters.minElo !== undefined) params.set("minElo", String(filters.minElo))
	if (filters.maxElo !== undefined) params.set("maxElo", String(filters.maxElo))
	if (filters.tags && filters.tags.length)
		params.set("tags", JSON.stringify(filters.tags))
	if (filters.sortBy) params.set("sortBy", filters.sortBy)
	if (filters.order) params.set("order", filters.order)

	return params.toString()
}

export default async function getUsers({
	page,
	limit,
	filters,
}: GetUsersParams) {
	// TODO Gestion d'erreur
	const response = await axios.get<{ users: User[]; nextPage: number | null }>(
		`/users?${buildUsersQuery({ page, limit, filters })}`,
	)

	return response.data
}
