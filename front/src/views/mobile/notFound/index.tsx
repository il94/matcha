import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export default function NotFoundPage() {
	const navigate = useNavigate()

	return (
		<main className="flex h-dvh flex-col items-center justify-center gap-6 bg-background px-9 text-center">
			<h1 className="text-7xl font-bold">404</h1>
			<p className="text-lg text-muted-foreground">This page does not exist.</p>
			<Button
				onClick={() => navigate("/")}
				variant="dark"
				className="h-12 w-full max-w-xs rounded-xl"
			>
				Back to home
			</Button>
		</main>
	)
}
