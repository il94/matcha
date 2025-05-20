import axios from "@/lib/axios"

type CreateVoteParams = {
	targetId: User["id"]
	reason: string
}

export default async function createReport({
	targetId,
	reason,
}: CreateVoteParams) {
	const response = await axios.post(`/user/report`, {
		targetId,
		reason,
	})

	return response.data
}
