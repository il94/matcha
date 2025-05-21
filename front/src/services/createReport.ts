import axios from "@/lib/axios"

type CreateReportParams = {
	targetId: User["id"]
	reason: string
}

export default async function createReport({
	targetId,
	reason,
}: CreateReportParams) {
	const response = await axios.post(`/user/report`, {
		targetId,
		reason,
	})

	return response.data
}
