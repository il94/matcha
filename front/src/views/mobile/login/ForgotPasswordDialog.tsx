import InputTextField from "@/components/FormFields/InputTextField"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormMessage } from "@/components/ui/form"
import forgot from "@/services/forgot"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
	email: z
		.string()
		.min(1, "Don't forget your email !")
		.email("Looks like that's not an email."),
})

type ForgotPasswordDialogProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function ForgotPasswordDialog({
	open,
	onOpenChange,
}: ForgotPasswordDialogProps) {
	const [isSent, setIsSent] = useState("")

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
		mode: "onTouched",
	})

	const { mutate: forgotMutation } = useMutation({
		mutationFn: forgot,
		onSuccess: (_, params) => {
			setIsSent(params.email)
		},
		onError: () => {
			form.setError("root", {
				message:
					"Looks like something went wrong. Don't worry, we're on it try again shortly.",
			})
		},
		onMutate: () => {
			setIsSent("")
		},
	})

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			forgotMutation(values)
		},
		[forgotMutation],
	)

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<DialogHeader>
							<DialogTitle>Reset Your Pass, No Stress</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							No worries, it happens ! Enter your email, and we'll send you a
							link to reset your password. Make sure to check your inbox (and
							your spam folder, just in case).
						</DialogDescription>
						<div className="flex flex-col gap-3">
							<InputTextField
								control={form.control}
								type="email"
								name="email"
								placeholder="Email"
								className="h-10 text-sm"
							/>
							<FormMessage isSuccess={!!isSent} className="h-5 px-1">
								{isSent ? `Succefully sent to ${isSent} !` : error}
							</FormMessage>
							<DialogFooter>
								<Button
									variant="dark"
									size="lg"
									className="font-semibold"
									disabled={!form.formState.isValid}
								>
									Send
								</Button>
							</DialogFooter>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
