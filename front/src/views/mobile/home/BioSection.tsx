type BioSectionProps = {
	bio: string
	firstName: string
}

export default function BioSection({ bio, firstName }: BioSectionProps) {
	return (
		<section className="flex flex-col items-end space-y-1 rounded-xl p-3">
			<p className="italic">{bio}</p>
			<p className="text-sm">{firstName}</p>
		</section>
	)
}
