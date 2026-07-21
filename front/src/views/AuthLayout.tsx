import type { ReactNode } from "react"

import BrandingPanel from "@/views/BrandingPanel"

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-dvh">
			<section className="flex w-full flex-col lg:w-1/2 lg:items-center lg:justify-center">
				{children}
			</section>
			<BrandingPanel />
		</div>
	)
}
