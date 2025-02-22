import axios from "@/lib/axios"

type resetPasswordParams = {
	password: string
}

export default async function resetPassword({ password }: resetPasswordParams) {
	const response = await axios.patch(`/reset-password`, {
		password,
	})

	return response.data
}
