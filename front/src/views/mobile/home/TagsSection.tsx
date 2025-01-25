import Tag from "./Tag"

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
