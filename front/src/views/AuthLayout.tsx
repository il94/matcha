import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-dvh">
			<section className="flex w-full flex-col lg:w-1/2 lg:items-center lg:justify-center">
				{children}
			</section>
			<aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary text-primary-foreground lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:gap-4">
				<h2 className="text-7xl font-bold tracking-tight">matcha</h2>
				<p className="text-lg opacity-90">Find your match.</p>
			</aside>
		</div>
	)
}
