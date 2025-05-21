import axios from "@/lib/axios"

type CreateBlockParams = {
	targetId: User["id"]
}

export default async function createBlock({ targetId }: CreateBlockParams) {
	const response = await axios.post(`/user/block`, {
		targetId,
	})

	return response.data
}
