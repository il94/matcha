import logout from "@/services/logout"
import publicLogout from "@/services/publicLogout"
import verify from "@/services/verify"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"
import useSocket from "./useSocket"
import toast from "@/lib/toast"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { formatRetryAfter } from "@/lib/utils"

export default function useAuth() {
	const navigate = useNavigate()

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["verify"],
		queryFn: DEBUG_ERRORS.verify ? forcedError : verify,
		retry: false,
	})

	const { socket, socketStatus } = useSocket(!!data?.isAuthenticated)

	const { mutate: logoutMutation } = useMutation({
		mutationFn: DEBUG_ERRORS.logout ? forcedError : logout,
		onSuccess: () => {
			navigate(0)
		},
		onError: () => {
			toast.error("Couldn't log you out. Give it another try !")
		},
	})

	const { mutate: publicLogoutMutation } = useMutation({
		mutationFn: DEBUG_ERRORS.logout ? forcedError : publicLogout,
		onSuccess: () => {
			navigate(0)
		},
		onError: (error: AxiosError<{ message: string; retryAfter?: number }>) => {
			if (error.response?.status === 429)
				toast.error(
					`Whoa, slow down there ! Too many attempts, try again in ${formatRetryAfter(error.response.data.retryAfter ?? 60)}.`,
				)
			else toast.error("Couldn't log you out. Give it another try !")
		},
	})

	return {
		user: data?.user,
		isAuthenticated: data?.isAuthenticated,
		isCompleting: data?.isCompleting,
		isReseting: data?.isReseting,

		socket,
		socketStatus,

		isPending,
		isError,
		error,
		logout: logoutMutation,
		publicLogout: publicLogoutMutation,
	}
}
