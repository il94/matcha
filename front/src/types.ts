import { PanInfo } from "motion/react"

export type FramerCallback = (
	_: globalThis.MouseEvent | TouchEvent | PointerEvent,
	info: PanInfo,
) => void

declare global {
	type User = {
		id: string
		createdAt: string
		firstName: string
		lastName: string
		username: string
		email: string
		birthDate: string
		gender: string
		sexualOrientation: string

		bio: string
		principalPicture: Picture
		pictures: Picture[]

		tags: Tag[]

		elo: number
		views: number
		matchs: number
		dates: number
	}

	type Picture = {
		name: string
	}

	type Tag = {
		id: number
		name: string
	}

	type Chat = {
		id: string
		title: User["firstName"]
		avatar: Picture["name"]
		messages: Message[]
		lastMessage: Message
	}

	type Message = {
		createdAt: string
		authorId: User["id"]
		content: string
		avatar: Picture["name"]
	}
}
