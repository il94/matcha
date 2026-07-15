import axios from "@/lib/axios"

export default async function getTags() {
	const response = await axios.get<Tag[]>(`/tags`)

	return response.data
}
