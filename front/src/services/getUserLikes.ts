import axios from "@/lib/axios"

export default async function getUserLikes() {
	const response =
		await axios.get<Pick<User, "id" | "firstName" | "principalPicture">[]>(
			`/user/likes`,
		)

	return response.data
}
