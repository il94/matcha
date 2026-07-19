import InputTextField from "@/components/FormFields/InputTextField"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormMessage } from "@/components/ui/form"
import login from "@/services/login"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Loader2Icon } from "lucide-react"
import { useCallback, useState } from "react"

import ForgotPasswordDialog from "./ForgotPasswordDialog"
import AuthLayout from "@/views/AuthLayout"
import useNavigateFrom from "@/hooks/useNavigateFrom"
import { cn, formatRetryAfter } from "@/lib/utils"

const formSchema = z.object({
	username: z
		.string()
		.min(1, "How will your future match find you if you don't have a name ?"),
	password: z
		.string()
		.min(
			1,
			"A password can be crucial for maintaining some... privacy in your love life.",
		),
})

export default function LoginPage() {
	const [isForgotPassword, setIsForgotPassword] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	})

	const navigateFrom = useNavigateFrom()

	const { mutate: loginMutation, isPending } = useMutation({
		mutationFn: login,
		onSuccess: () => {
			navigateFrom("/home")
		},
		onError: (error: AxiosError<{ message: string; retryAfter?: number }>) => {
			if (error.response?.status === 403)
				form.setError("password", {
					message:
						"Oops ! The password you entered didn't work. Let's try that again !",
				})
			else if (error.response?.status === 429)
				form.setError("root", {
					message: `Whoa, slow down there ! Too many attempts, try again in ${formatRetryAfter(error.response.data.retryAfter ?? 60)}.`,
				})
			else
				form.setError("root", {
					message:
						"Looks like something went wrong. Don't worry, we're on it, try again shortly.",
				})
		},
	})

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			loginMutation(values)
		},
		[loginMutation],
	)

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<AuthLayout>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault()
							form.handleSubmit(onSubmit)()
						}
					}}
					className="flex h-full w-full flex-col items-center justify-between px-9 pb-4 pt-10 lg:h-auto lg:max-w-md lg:justify-center lg:gap-10 lg:py-0"
				>
					<h1 className="text-6xl">Login</h1>
					<div className="flex w-full flex-col gap-6">
						<InputTextField
							control={form.control}
							name="username"
							placeholder="Username"
							className="h-12"
						/>
						<div>
							<InputTextField
								control={form.control}
								type="password"
								name="password"
								placeholder="Password"
								className="h-12"
							/>
							<Button
								onClick={() => setIsForgotPassword(true)}
								type="button"
								variant="link"
								className="p-0 pl-1 hover:no-underline"
							>
								Forgot password ?
							</Button>
						</div>

						<FormMessage className="h-5 px-1">{error}</FormMessage>
					</div>

					<div className="flex w-full flex-col items-center gap-6">
						<Button
							variant="dark"
							size="lg"
							className={cn("font-semibold", isPending && "pl-4 pr-5")}
							type="submit"
							disabled={!form.formState.isValid || isPending}
						>
							{isPending && <Loader2Icon className="animate-spin" />}
							Login
						</Button>
						<p>
							Don't have an account ?{" "}
							<Link to="/register" className="font-bold text-primary">
								Register
							</Link>
						</p>
					</div>
				</form>
			</Form>
			<ForgotPasswordDialog
				open={!!isForgotPassword}
				onOpenChange={setIsForgotPassword}
			/>
		</AuthLayout>
	)
}
