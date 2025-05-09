import { toast } from "sonner"

export default {
	success: (message: string) => {
		toast.success(message, {
			position: "top-center",
			duration: 2000,
		})
	},
}
