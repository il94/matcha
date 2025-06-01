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
					<DialogDescription className="text-left">
						<p className="mb-4">
							We use your location to enhance match suggestions based on
							geographic proximity.
						</p>
						<p className="mb-4">
							<strong>Location Methods:</strong>
						</p>
						<ul className="mb-4 list-disc pl-5">
							<li>
								<strong>GPS:</strong> Precise location if enabled.
							</li>
							<li>
								<strong>IP Address:</strong> Approximate location if GPS is
								unavailable.
							</li>
							<li>
								<strong>Manual Input:</strong> You can enter your location
								manually.
							</li>
						</ul>
						<p className="mb-4">
							Adjust or disable location settings anytime in your profile.
						</p>
						<p>
							Your privacy is important to us; location data is securely
							handled.
						</p>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
