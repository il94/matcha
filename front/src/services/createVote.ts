import axios from "@/lib/axios"

type CreateVoteParams = {
	targetId: User["id"]
	vote: boolean
}

export default async function createVote({ targetId, vote }: CreateVoteParams) {
	const response = await axios.post<{ match: boolean; chatId: Chat["id"] }>(
		`/user/vote`,
		{
			targetId,
			vote,
		},
	)

	return response.data
}
