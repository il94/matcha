import InputTextField from "@/components/FormFields/InputTextField"
import { Button } from "@/components/ui/button"
import { Form, FormMessage } from "@/components/ui/form"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import { cn } from "@/lib/utils"
import resetPassword from "@/services/resetPassword"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"
import { AxiosError } from "axios"

export const formSchema = z.object({
	password: z
		.string()
		.min(1, "Wait... you wanted to change your password, right ?")
		.refine((password) => /[a-z]/.test(password), {
			message: "A little lowercase letter never hurt anyone. Try adding one.",
		})
		.refine((password) => /[A-Z]/.test(password), {
			message: "An uppercase letter adds some strength, don't skip it !",
		})
		.refine((password) => /[0-9]/.test(password), {
			message: "Numbers make everything more secure. Add one in there.",
		})
		.refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
			message: "Spice things up with a special character !",
		})
		.refine((password) => password.length >= 8, {
			message: "Passwords need at least 8 characters. You're almost there !",
		}),
	retypePassword: z.string(),
})

export default function ResetPage() {
	const { publicLogout } = useAuthOutletContext()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			retypePassword: "",
		},
		mode: "onTouched",
	})

	const watched = form.watch()

	const navigate = useNavigate()

	const { mutate: resetPasswordMutation, isPending } = useMutation({
		mutationFn: resetPassword,
		onSuccess: () => {
			navigate(0)
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (
				error.response?.status === 403 &&
				error.response.data.message === "WORD_IN_PASSWORD"
			) {
				form.setError("password", {
					message:
						"Your password contains a common word, let's make it more unique!",
				})
			} else {
				form.setError("root", {
					message:
						"Looks like something went wrong. Don't worry, we're on it, try again shortly.",
				})
			}
		},
	})

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			if (values.password !== values.retypePassword) {
				form.setError("retypePassword", {
					message: "Passwords don't match. Try again.",
				})
				return
			}

			resetPasswordMutation(values)
		},
		[resetPasswordMutation, form],
	)

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<main className="h-dvh">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex h-full w-full flex-col items-center justify-between px-9 pb-4 pt-10"
				>
					<div className="flex flex-col gap-16">
						<h1 className="text-4xl">Choose a new password</h1>
						<div className="flex w-full flex-col gap-6">
							<InputTextField
								control={form.control}
								type="password"
								name="password"
								placeholder="Password"
								className="h-12"
							/>
							<InputTextField
								control={form.control}
								type="password"
								name="retypePassword"
								placeholder="Re-type Password"
								className="h-12"
							/>
						</div>
					</div>

					<FormMessage className="px-1">{error}</FormMessage>

					<div className="flex w-full flex-col items-center pb-12">
						<Button
							variant="dark"
							size="lg"
							className={cn("font-semibold", isPending && "pl-4 pr-5")}
							disabled={
								!form.formState.isValid ||
								watched.password !== watched.retypePassword ||
								isPending
							}
						>
							{isPending && <Loader2Icon className="animate-spin" />}
							Reset
						</Button>
						<Button
							onClick={publicLogout}
							type="button"
							variant="darkLink"
							className="hover:text-destructive/70"
						>
							Back to login
						</Button>
					</div>
				</form>
			</Form>
		</main>
	)
}
