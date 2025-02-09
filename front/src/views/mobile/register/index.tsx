import Field from "@/components/Field"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

const formSchema = z.object({
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	username: z.string(),
	password: z.string().min(8),
})

export default function RegisterPage() {
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

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
							name="password"
							placeholder="Password"
							className="h-12"
						/>
					</div>

					<div className="flex w-full flex-col items-center gap-6">
						<Button
							variant="dark"
							size="lg"
							className="font-semibold"
							type="submit"
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
		</main>
	)
}
