import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

export default function Step4LocationDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="link"
					className="inline-flex h-fit p-0 hover:no-underline"
				>
					Learn more about location use
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>How We Use Your Location</DialogTitle>
					<DialogDescription asChild>
						<div className="text-left text-sm text-muted-foreground">
							<p className="mb-4">
								We use your location to enhance match suggestions based on
								geographic proximity.
							</p>
							<p className="mb-4">
								<strong>Location Methods:</strong>
							</p>
							<ul className="mb-4 list-disc pl-5">
								<li>
									<strong>GPS:</strong> Precise location if you consent.
								</li>
								<li>
									<strong>Manual Input:</strong> If you decline GPS, enter your
									city or neighbourhood manually.
								</li>
							</ul>
							<p className="mb-4">
								Adjust or disable location settings anytime in your profile.
							</p>
							<p>
								Your privacy is important to us; location data is securely
								handled.
							</p>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
