import Field from "@/components/Field"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormMessage } from "@/components/ui/form"
import { useCallback, useState } from "react"
import register from "@/services/register"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog"

// TODO voir si besoin d'interdire des chars
const formSchema = z.object({
	email: z
		.string()
		.min(1, "We need your email to send you those sweet updates !")
		.max(256, "Your email must be under 256 characters—brevity is charming !")
		.email("Hmm, that doesn't look like a valid email address. Try again ?"),
	firstName: z
		.string()
		.min(1, "Your first name is the spark of your charm—let it shine !")
		.max(64, "Keep your first name under 64 characters; simple is stylish."),
	lastName: z
		.string()
		.min(1, "Your last name completes your story—share it with us !")
		.max(
			64,
			"Please limit your last name to 64 characters; elegance in simplicity !",
		),
	username: z
		.string()
		.min(1, "Your username is your stage name—make it memorable !")
		.max(
			32,
			"A short username is easier to remember—stick to 32 characters or less !",
		),
	password: z
		.string()
		.min(
			1,
			"A password can be crucial for maintaining some... privacy in your love life.",
		)
		.refine((password) => /[a-z]/.test(password), {
			message:
				"Without a lowercase letter, your password feels a bit incomplete, doesn't it?",
		})
		.refine((password) => /[A-Z]/.test(password), {
			message:
				"A touch of uppercase makes your password look more serious and secure.",
		})
		.refine((password) => /[0-9]/.test(password), {
			message: "Adding a number shows you're ready to do the math of love.",
		})
		.refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
			message: "Special characters are the spice your password needs.",
		})
		.refine((password) => password.length >= 8, {
			message:
				"A strong bond requires time, and a strong password requires 8 characters.",
		}),
})

export default function RegisterPage() {
	const [isRegistered, setIsRegistered] = useState("")

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			username: "",
			password: "",
		},
		mode: "onTouched",
	})

	const { mutate: registerMutation } = useMutation({
		mutationFn: register,
		onSuccess: () => {
			setIsRegistered(form.getValues().email)
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (error.response?.status === 403)
				if (error.response.data.message === "EMAIL_ALREADY_TAKEN")
					form.setError("email", {
						message:
							"This email is already spoken for—try a different one to stay unique !",
					})
				else if (error.response.data.message === "USERNAME_ALREADY_TAKEN")
					form.setError("username", {
						message:
							"Someone else snagged this username—it's popular ! Try a new one.",
					})
				else
					form.setError("root", {
						message:
							"Looks like something went wrong. Don't worry, we're on it try again shortly.",
					})
		},
	})

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			console.log({ values })
			registerMutation(values)
		},
		[registerMutation],
	)

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<main className="h-dvh">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex h-full w-full flex-col items-center justify-between px-9 pb-4 pt-10"
				>
					<h1 className="text-6xl">Register</h1>
					<div className="flex w-full flex-col gap-6">
						<Field
							control={form.control}
							type="email"
							name="email"
							placeholder="Email"
							className="h-12"
						/>
						<Field
							control={form.control}
							name="firstName"
							placeholder="First name"
							className="h-12"
						/>
						<Field
							control={form.control}
							name="lastName"
							placeholder="Last name"
							className="h-12"
						/>
						<Field
							control={form.control}
							name="username"
							placeholder="Username"
							className="h-12"
						/>
						<Field
							control={form.control}
							type="password"
							name="password"
							placeholder="Password"
							className="h-12"
						/>
						<FormMessage className="h-5 px-1">{error}</FormMessage>
					</div>

					<div className="flex w-full flex-col items-center gap-6">
						<Button
							variant="dark"
							size="lg"
							className="font-semibold"
							type="submit"
							disabled={!form.formState.isValid}
						>
							Register
						</Button>
						<p>
							Already have an account ?{" "}
							<Link to="/login" className="font-bold text-primary">
								Log in
							</Link>
						</p>
					</div>
				</form>
			</Form>
			<Dialog open={!!isRegistered} onOpenChange={() => setIsRegistered("")}>
				<DialogContent>
					<DialogHeader>Check Your Inbox, Cupid's Calling !</DialogHeader>
					<DialogDescription>
						We've sent a little something to{" "}
						<span className="font-semibold text-secondary">{isRegistered}</span>
						. It's waiting for you in your inbox (or hiding in your spam folder,
						because emails can be shy sometimes). Don't keep us waiting too
						long, okay ?
					</DialogDescription>
					<DialogFooter>
						<Button asChild>
							<Link to="/login">Back to login</Link>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</main>
	)
}
