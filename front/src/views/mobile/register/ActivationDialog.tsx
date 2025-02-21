import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Link } from "react-router"

type ActivationDialogProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	email: User["email"]
}

export default function ActivationDialog({
	open,
	onOpenChange,
	email,
}: ActivationDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Check Your Inbox, Cupid's Calling !</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					We've sent a little something to{" "}
					<span className="font-semibold text-secondary">{email}</span>. It's
					waiting for you in your inbox (or hiding in your spam folder, because
					emails can be shy sometimes). Don't keep us waiting too long, okay ?
				</DialogDescription>
				<DialogFooter>
					<Button asChild>
						<Link to="/login">Back to login</Link>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
