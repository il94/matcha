import axios from "@/lib/axios"

export default async function getUserLikes() {
	// TODO Gestion d'erreur
	const response =
		await axios.get<Pick<User, "id" | "firstName" | "principalPicture">[]>(
			`/user/likes`,
		)

	return response.data
}
