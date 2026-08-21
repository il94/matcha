function MatchaLeaf({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 48 48"
			fill="none"
			stroke="currentColor"
			strokeWidth={2.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M24 44V22" />
			<path d="M24 30C24 21 30 12 41 10c1 11-5 20-17 20Z" />
			<path d="M24 24C24 16 19 8 8 7c-1 10 4 17 16 17Z" />
		</svg>
	)
}

export default function BrandingPanel() {
	return (
		<aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-primary text-primary-foreground lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
			<div
				aria-hidden="true"
				className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl motion-safe:animate-blob"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 origin-bottom-right bg-[radial-gradient(105%_105%_at_100%_100%,hsl(var(--secondary)/0.95)_0%,hsl(var(--secondary)/0.88)_32%,hsl(var(--secondary)/0.35)_58%,transparent_74%)] motion-safe:animate-corner-glow"
			/>

			<div className="relative z-10 flex flex-col items-center gap-4 px-8">
				<MatchaLeaf className="h-12 w-12" />
				<h2 className="text-7xl font-bold tracking-tight">matcha</h2>
				<p className="text-lg tracking-wide text-primary-foreground/95">
					Steep. Sip. Match.
				</p>
			</div>
		</aside>
	)
}
