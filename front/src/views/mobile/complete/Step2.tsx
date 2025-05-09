import TextAreaField from "@/components/FormFields/TextAreaField"
import { useFormContext } from "react-hook-form"

export default function Step2() {
	const form = useFormContext()

	return (
		<div className="flex flex-col gap-16">
			<h1 className="text-4xl">Tell Us About Yourself</h1>
			<div className="flex w-full flex-col gap-6">
				<p>
					While optional, a bio helps others get to know you better and can make
					you much more appealing to potential matches
				</p>
				<TextAreaField
					control={form.control}
					name="bio"
					placeholder="Bio"
					autoSize
					maxLength={256}
					disableErrorMessage
					className="h-24 max-h-64 min-h-24"
				/>
			</div>
		</div>
	)
}
