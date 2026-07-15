import axios from "@/lib/axios"

export default async function getUserViews() {
	const response =
		await axios.get<Pick<User, "id" | "firstName" | "principalPicture">[]>(
			`/user/views`,
		)

	return response.data
}
