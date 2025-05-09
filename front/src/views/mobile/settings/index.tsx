import SectionButton from "./SectionButton"
import { useState } from "react"
import SettingSlider from "./SettingSlider"

export default function SettingsPage() {
	const [settingSelected, setSettingSelected] = useState("")

	return (
		<main className="relative flex h-full flex-col items-center justify-between gap-4 overflow-y-scroll px-3 pb-8 pt-4">
			<div className="w-full space-y-2">
				<h2 className="px-2 text-sm font-medium text-muted-foreground">
					Account Security
				</h2>
				<SectionButton
					onClick={() => setSettingSelected("email")}
					label="Email"
				/>
				<SectionButton
					onClick={() => setSettingSelected("password")}
					label="Password"
				/>
			</div>

			<div className="w-full space-y-2">
				<h2 className="px-2 text-sm font-medium text-muted-foreground">
					Personal Information
				</h2>
				<SectionButton
					onClick={() => setSettingSelected("first_name")}
					label="First name"
				/>
				<SectionButton
					onClick={() => setSettingSelected("last_name")}
					label="Last name"
				/>
				<SectionButton
					onClick={() => setSettingSelected("username")}
					label="Username"
				/>
				<SectionButton
					onClick={() => setSettingSelected("birth_date")}
					label="Birth date"
				/>
			</div>

			<div className="w-full space-y-2">
				<h2 className="px-2 text-sm font-medium text-muted-foreground">
					Profile Details
				</h2>
				<SectionButton
					onClick={() => setSettingSelected("gender")}
					label="Gender"
				/>
				<SectionButton
					onClick={() => setSettingSelected("sexual_orientation")}
					label="Sexual orientation"
				/>
				<SectionButton
					onClick={() => setSettingSelected("tags")}
					label="Tags"
				/>
				<SectionButton onClick={() => setSettingSelected("bio")} label="Bio" />
				<SectionButton
					onClick={() => setSettingSelected("pictures")}
					label="Pictures"
				/>
			</div>

			<SettingSlider
				settingSelected={settingSelected}
				setSettingSelected={setSettingSelected}
			/>
		</main>
	)
}
