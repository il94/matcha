import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import logout from "@/services/logout"
import toast from "@/lib/toast"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"

export const DEMO_DIALOG_STORAGE_KEY = "matcha-demo-dialog-seen"

export default function DemoDialog() {
	const [open, setOpen] = useState(
		() => !sessionStorage.getItem(DEMO_DIALOG_STORAGE_KEY),
	)

	const onOpenChange = (next: boolean) => {
		if (!next) sessionStorage.setItem(DEMO_DIALOG_STORAGE_KEY, "true")
		setOpen(next)
	}

	const { mutate: leaveDemo, isPending } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			sessionStorage.removeItem(DEMO_DIALOG_STORAGE_KEY)
			window.location.href = "/register"
		},
		onError: () => {
			toast.error("Couldn't log you out. Give it another try !")
		},
	})

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
				<div className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>Welcome to the demo</DialogTitle>
					</DialogHeader>
					<DialogDescription asChild>
						<div className="flex flex-col gap-3">
							<p>
								You're logged in with the shared demo account, so you can look
								around without signing up.
							</p>
							<p>
								It's <span className="font-bold">read-only</span> : browse the
								profiles, open them, check your views, likes and notifications.
								Liking, matching, chatting and editing the profile are all
								disabled here.
							</p>
							<p>
								Since the account is shared, someone else may take it over at
								any time.
							</p>
							<p>
								Ready for the real thing ?{" "}
								<Button
									onClick={() => leaveDemo()}
									type="button"
									variant="link"
									disabled={isPending}
									className="h-auto p-0 align-baseline font-bold text-primary hover:no-underline"
								>
									{isPending && <Loader2Icon className="animate-spin" />}
									Create an account
								</Button>
								.
							</p>
						</div>
					</DialogDescription>
					<DialogFooter>
						<Button
							variant="dark"
							size="lg"
							className="font-semibold"
							onClick={() => onOpenChange(false)}
						>
							Have a look around
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	)
}
