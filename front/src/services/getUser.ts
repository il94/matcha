import axios from "@/lib/axios"

type GetUserParams = {
	userId?: User["id"]
}

export default async function getUser({ userId }: GetUserParams) {
	const response = await axios.get<User>(userId ? `/user/${userId}` : "/user")

	return response.data
}
