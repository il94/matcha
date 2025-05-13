import { cn } from "@/lib/utils"
import { ChevronLeftIcon } from "lucide-react"
import EmailSlider from "./EmailSlider"
import PasswordSlider from "./PasswordSlider"
import FirstNameSlider from "./FirstNameSlider"
import LastNameSlider from "./LastNameSlider"
import GenderSlider from "./GenderSlider"
import SexualOrientationSlider from "./SexualOrientationSlider"
import UsernameSlider from "./UsernameSlider"
import BirthDateSlider from "./BirthDateSlider"
import TagsSlider from "./TagsSlider"
import BioSlider from "./BioSlider"
import PicturesSlider from "./PicturesSlider"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"

type SettingSliderProps = {
	settingSelected: string
	setSettingSelected: (setting: string) => void
}

export default function SettingSlider({
	settingSelected,
	setSettingSelected,
}: SettingSliderProps) {
	const { user } = useAuthOutletContext()

	type SliderProps = {
		onClose: () => void
		className?: string
	}

	const Slider = ({ onClose, className }: SliderProps) => {
		switch (settingSelected) {
			case "email":
				return (
					<EmailSlider
						initialValue={user.email}
						onClose={onClose}
						className={className}
					/>
				)
			case "username":
				return (
					<UsernameSlider
						initialValue={user.username}
						onClose={onClose}
						className={className}
					/>
				)
			case "first_name":
				return (
					<FirstNameSlider
						initialValue={user.firstName}
						onClose={onClose}
						className={className}
					/>
				)
			case "last_name":
				return (
					<LastNameSlider
						initialValue={user.lastName}
						onClose={onClose}
						className={className}
					/>
				)
			case "password":
				return <PasswordSlider onClose={onClose} className={className} />

			case "birth_date":
				return (
					<BirthDateSlider
						initialValue={user.birthDate}
						onClose={onClose}
						className={className}
					/>
				)
			case "gender":
				return (
					<GenderSlider
						initialValue={user.gender}
						onClose={onClose}
						className={className}
					/>
				)
			case "sexual_orientation":
				return (
					<SexualOrientationSlider
						initialValue={user.sexualOrientation!}
						onClose={onClose}
						className={className}
					/>
				)
			case "bio":
				return (
					<BioSlider
						initialValue={user.bio}
						onClose={onClose}
						className={className}
					/>
				)
			case "tags":
				return (
					<TagsSlider
						initialValue={user.tags}
						onClose={onClose}
						className={className}
					/>
				)
			case "pictures":
				return (
					<PicturesSlider
						initialValue={{
							principalPicture: user.principalPicture.name,
							secondaryPicture1: user.pictures[0]?.name,
							secondaryPicture2: user.pictures[1]?.name,
							secondaryPicture3: user.pictures[2]?.name,
							secondaryPicture4: user.pictures[3]?.name,
						}}
						onClose={onClose}
						className={className}
					/>
				)
			default:
				return null
		}
	}

	return (
		<div
			className={cn(
				"fixed top-12 flex h-[calc(100%-56px-48px)] w-full flex-col overflow-hidden bg-background p-2 transition-transform",
				settingSelected ? "translate-x-0" : "translate-x-full",
			)}
		>
			<ChevronLeftIcon
				onClick={() => setSettingSelected("")}
				className="size-8"
			/>

			<Slider onClose={() => setSettingSelected("")} className="grow p-4" />
		</div>
	)
}
