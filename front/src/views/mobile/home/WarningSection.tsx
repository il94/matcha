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
import createReport from "@/services/createReport"
import { useMutation } from "@tanstack/react-query"
import { FormEvent, useCallback, useState } from "react"

type WarningDialogProps = {
	userId: User["id"]
	firstName: User["firstName"]
}

function BlockDialog({ userId, firstName }: WarningDialogProps) {
	const [isOpen, setIsOpen] = useState(false)

	// const { mutate: createBlockMutation } = useMutation({
	// 	mutationFn: createBlock,
	// 	onSuccess: () => {
	// 		toast.success("Block sent")
	// 		setIsOpen(false)
	// 		setReason("")
	// 	},
	// 	onError: (error) => {
	// 		console.error(error) // TODO
	// 	},
	// })

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
						Are you sure you want to block {firstName} ? // TODO EXPLIQUER
						CONSEQUENCES
					</DialogDescription>
					<Button
						variant="destructiveDark"
						className="h-10 w-fit self-end rounded-xl"
					>
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

	const { mutate: createReportMutation } = useMutation({
		mutationFn: createReport,
		onSuccess: () => {
			toast.success("Report sent")
			setIsOpen(false)
			setReason("")
		},
		onError: (error) => {
			console.error(error) // TODO
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
						What is the reason for your report ? // TODO EXPLIQUER CONSEQUENCES
					</DialogDescription>
					<Textarea
						value={reason}
						onChange={(e) => setReason(e.target.value)}
						className="resize-none"
						rows={4}
					/>
					<Button
						variant="destructiveDark"
						disabled={!reason}
						className="h-10 w-fit self-end rounded-xl"
					>
						Report
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

type WarningSectionProps = {
	user: User
	isPreview?: boolean
}

export default function WarningSection({ user }: WarningSectionProps) {
	return (
		<div className="space-y-3">
			{/* <Button
				variant="destructiveDark"
				disabled={isPreview}
				className="h-10 w-full rounded-xl"
			>
				Block {user.firstName}
			</Button> */}
			<BlockDialog userId={user.id} firstName={user.firstName} />
			<ReportDialog userId={user.id} firstName={user.firstName} />
		</div>
	)
}
