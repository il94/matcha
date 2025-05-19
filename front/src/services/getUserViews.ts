import axios from "@/lib/axios"

export default async function getUserViews() {
	// TODO Gestion d'erreur
	const response =
		await axios.get<Pick<User, "id" | "firstName" | "principalPicture">[]>(
			`/user/views`,
		)

	return response.data
}
