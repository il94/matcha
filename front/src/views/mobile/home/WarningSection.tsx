import { Button } from "@/components/ui/button"

type WarningSectionProps = {
	user: User
	isPreview?: boolean
}

export default function WarningSection({
	user,
	isPreview,
}: WarningSectionProps) {
	return (
		<div className="space-y-3">
			<Button
				variant="destructiveDark"
				disabled={isPreview}
				className="h-10 w-full rounded-xl"
			>
				Block {user.firstName}
			</Button>
			<Button
				variant="destructiveDark"
				disabled={isPreview}
				className="h-10 w-full rounded-xl"
			>
				Report {user.firstName}
			</Button>
		</div>
	)
}
