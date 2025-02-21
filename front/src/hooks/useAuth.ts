import logout from "@/services/logout"
import verify from "@/services/verify"
import { useMutation, useQuery } from "@tanstack/react-query"

// TODO On error
export default function useAuth() {
	const { data, isPending } = useQuery({
		queryKey: ["verify"],
		queryFn: verify,
		retry: false,
	})

	const { mutate: logoutMutation } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			window.location.reload()
		},
	})

	return {
		userId: data?.userId,
		isAuthenticated: data?.isAuthenticated,
		isCompleting: data?.isCompleting,

		isPending,
		logout: logoutMutation,
	}
}
