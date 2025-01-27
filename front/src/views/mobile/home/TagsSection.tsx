import {
	ClapperboardIcon,
	PawPrintIcon,
	PlaneIcon,
	UtensilsIcon,
} from "lucide-react"

type TagProps = {
	content: "Cinéma" | "Voyages" | "Sushis" | "Cats"
}

function Tag({ content }: TagProps) {
	const icons = {
		Cinéma: ClapperboardIcon,
		Voyages: PlaneIcon,
		Sushis: UtensilsIcon,
		Cats: PawPrintIcon,
	}

	const Icon = icons[content] || null

	return (
		<p className="flex w-fit items-center gap-x-1 rounded-full bg-white/50 px-2 py-0.5 text-sm">
			<Icon className="size-5" />
			{content}
		</p>
	)
}

export default function TagsSection() {
	return (
		<section className="flex flex-wrap gap-2 rounded-xl bg-secondary p-2 text-black">
			<Tag content="Cinéma" />
			<Tag content="Voyages" />
			<Tag content="Sushis" />
			<Tag content="Cats" />
		</section>
	)
}
