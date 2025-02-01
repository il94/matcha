import { PanInfo } from "motion/react"

declare global {
	type User = {
		id: string
		createdAt: string
		firstName: string
		lastName: string
		userName: string
		email: string
		birthDate: string
		sexualOrientation: string
		gender?: string

		bio?: string
		images: string[]

		tags: Tag[]

		elo: number
		views: number
		matchs: number
		dates: number
	}

	type Tag = {
		id: number
		name: string
	}
}

export type FramerCallback = (
	_: globalThis.MouseEvent | TouchEvent | PointerEvent,
	info: PanInfo,
) => void
