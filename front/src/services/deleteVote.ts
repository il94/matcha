import axios from "@/lib/axios"

type DeleteVoteParams = {
	targetId: User["id"]
}

export default async function deleteVote({ targetId }: DeleteVoteParams) {
	const response = await axios.delete(`/user/vote/${targetId}`)

	return response.data
}
