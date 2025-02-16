import verify from "@/services/verify"
import { useQuery } from "@tanstack/react-query"

export default function useAuth() {
	const { data: isAuthenticated, isPending } = useQuery({
		queryKey: ["verify"],
		queryFn: verify,
		retry: false,
	})

	return {
		isAuthenticated,
		isPending,
	}
}
