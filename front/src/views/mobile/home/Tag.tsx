import {
	ClapperboardIcon,
	PawPrintIcon,
	PlaneIcon,
	UtensilsIcon,
} from "lucide-react"

type TagProps = {
	content: "Cinéma" | "Voyages" | "Sushis" | "Cats"
}

export default function Tag({ content }: TagProps) {
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
