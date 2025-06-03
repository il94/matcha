import logout from "@/services/logout"
import publicLogout from "@/services/publicLogout"
import verify from "@/services/verify"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import useSocket from "./useSocket"

// TODO On error
export default function useAuth() {
	const navigate = useNavigate()

	const { data, isPending, isError } = useQuery({
		queryKey: ["verify"],
		queryFn: verify,
		retry: false,
	})

	const { socket, isReady } = useSocket()

	const { mutate: logoutMutation } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			navigate(0)
		},
	})

	const { mutate: publicLogoutMutation } = useMutation({
		mutationFn: publicLogout,
		onSuccess: () => {
			navigate(0)
		},
	})

	return {
		user: data?.user,
		isAuthenticated: data?.isAuthenticated,
		isCompleting: data?.isCompleting,
		isReseting: data?.isReseting,

		socket,
		isReady,

		isPending,
		isError,
		logout: logoutMutation,
		publicLogout: publicLogoutMutation,
	}
}
