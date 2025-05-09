import axios from "@/lib/axios"

type UpdateUserParams = Partial<User>

export default async function updateUser(userData: UpdateUserParams) {
	const response = await axios.patch(`/user`, {
		...userData,
	})

	return response.data
}
