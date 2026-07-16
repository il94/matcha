import {
	CpuIcon,
	PlaneIcon,
	DumbbellIcon,
	MusicIcon,
	PaletteIcon,
	CameraIcon,
	ShoppingBagIcon,
	FilmIcon,
	BookIcon,
	LeafIcon,
	MountainIcon,
	EyeIcon,
	MoonIcon,
	GitBranchIcon,
	CalendarIcon,
	SunIcon,
	EditIcon,
	CodeIcon,
	BrushIcon,
	UsersIcon,
	GlobeIcon,
	SmileIcon,
	HeartPulseIcon,
	ZapIcon,
	LayoutIcon,
	HouseIcon,
	BikeIcon,
	FootprintsIcon,
	BackpackIcon,
	HandIcon,
	Gamepad2Icon,
	TelescopeIcon,
	WavesLadderIcon,
	BriefcaseIcon,
	BookOpenIcon,
	CookingPotIcon,
	Music,
	HammerIcon,
} from "lucide-react"

const tagList = {
	Technology: CpuIcon,
	Gaming: Gamepad2Icon,
	Travel: PlaneIcon,
	Sports: DumbbellIcon,
	Music: MusicIcon,
	Cooking: CookingPotIcon,
	Art: PaletteIcon,
	Photography: CameraIcon,
	Fashion: ShoppingBagIcon,
	Movies: FilmIcon,
	Books: BookIcon,
	Nature: LeafIcon,
	Hiking: MountainIcon,
	Reading: EyeIcon,
	Yoga: MoonIcon,
	Painting: PaletteIcon,
	Writing: EditIcon,
	Anime: FilmIcon,
	Gardening: LeafIcon,
	Meditation: MoonIcon,
	Coding: CodeIcon,
	Architecture: HouseIcon,
	Theater: UsersIcon,
	Cycling: BikeIcon,
	Running: FootprintsIcon,
	Adventure: BackpackIcon,
	"Social Media": GlobeIcon,
	Volunteering: HandIcon,
	Startups: GitBranchIcon,
	Design: BrushIcon,
	"Interior Design": LayoutIcon,
	"Music Production": Music,
	Astronomy: TelescopeIcon,
	Swimming: WavesLadderIcon,
	Beach: SunIcon,
	Comedy: SmileIcon,
	"Technology News": ZapIcon,
	History: CalendarIcon,
	Entrepreneurship: BriefcaseIcon,
	DIY: HammerIcon,
	"Traveling Abroad": GlobeIcon,
	"Mental Health": HeartPulseIcon,
	Sustainability: LeafIcon,
	Philosophy: BookOpenIcon,
}

type TagType = keyof typeof tagList

type TagProps = {
	content: TagType
}

function Tag({ content }: TagProps) {
	const Icon = tagList[content]

	return (
		<p className="flex w-fit items-center gap-x-1 rounded-full bg-white/50 px-2 py-0.5 text-sm">
			<Icon className="size-5" />
			{content}
		</p>
	)
}

type TagsSectionProps = {
	tags: Tag[]
}

export default function TagsSection({ tags }: TagsSectionProps) {
	return (
		<section className="flex flex-wrap gap-2 rounded-xl bg-secondary p-2 text-black">
			{tags.map((tag, index) => (
				<Tag key={`${tag.name}-${index}`} content={tag.name as TagType} />
			))}
		</section>
	)
}
