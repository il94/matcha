import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import toast from "@/lib/toast"
import createBlock from "@/services/createBlock"
import createReport from "@/services/createReport"
import { useMutation } from "@tanstack/react-query"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { Loader2Icon } from "lucide-react"
import { FormEvent, useCallback, useState } from "react"
import { useNavigate } from "react-router"

type WarningDialogProps = {
	userId: User["id"]
	firstName: User["firstName"]
	onBlock?: () => void
}

function BlockDialog({ userId, firstName, onBlock }: WarningDialogProps) {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	const { mutate: createBlockMutation, isPending } = useMutation({
		mutationFn: DEBUG_ERRORS.block ? forcedError : createBlock,
		onSuccess: () => {
			toast.success("They're blocked, you won't hear from them again.")
			onBlock?.()
			navigate(0)
		},
		onError: () => {
			toast.error("Couldn't block this user. Try again !")
		},
	})

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructiveDark" className="h-10 w-full rounded-xl">
					Block {firstName}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className="flex flex-col gap-3">
					<DialogTitle>Block {firstName}</DialogTitle>
					<DialogDescription>
						Are you sure you want to block {firstName} ? They will no longer
						appear in your suggestions, you will stop receiving their
						notifications, and your chat will be closed.
					</DialogDescription>
					<Button
						onClick={() => createBlockMutation({ targetId: userId })}
						disabled={isPending}
						variant="destructiveDark"
						className="h-10 w-fit self-end rounded-xl"
					>
						{isPending && <Loader2Icon className="animate-spin" />}
						Block
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function ReportDialog({ userId, firstName }: WarningDialogProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [reason, setReason] = useState("")

	const { mutate: createReportMutation, isPending } = useMutation({
		mutationFn: DEBUG_ERRORS.report ? forcedError : createReport,
		onSuccess: () => {
			toast.success("Report sent, thanks for keeping Matcha safe !")
			setIsOpen(false)
			setReason("")
		},
		onError: () => {
			toast.error("Couldn't send your report. Try again !")
		},
	})

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			if (!reason) return

			createReportMutation({
				targetId: userId,
				reason,
			})
		},
		[createReportMutation, reason, userId],
	)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructiveDark" className="h-10 w-full rounded-xl">
					Report {firstName}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<DialogTitle>Report {firstName}</DialogTitle>
					<DialogDescription>
						What is the reason for reporting {firstName} ? Your report will be
						reviewed by our team.
					</DialogDescription>
					<Textarea
						value={reason}
						onChange={(e) => setReason(e.target.value)}
						className="resize-none"
						rows={4}
						maxLength={500}
					/>
					<Button
						variant="destructiveDark"
						disabled={!reason || isPending}
						className="h-10 w-fit self-end rounded-xl"
					>
						{isPending && <Loader2Icon className="animate-spin" />}
						Report
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

type WarningSectionProps = {
	user: User
	onBlock?: () => void
}

export default function WarningSection({ user, onBlock }: WarningSectionProps) {
	return (
		<div className="space-y-3">
			<BlockDialog
				userId={user.id}
				firstName={user.firstName}
				onBlock={onBlock}
			/>
			<ReportDialog userId={user.id} firstName={user.firstName} />
		</div>
	)
}
