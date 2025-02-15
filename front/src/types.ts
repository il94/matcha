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
		sexualOrientation: string
		gender?: string

		bio?: string
		pictures: string[]

		tags: Tag[]

		elo: number
		views: number
		matchs: number
		dates: number
	}

	type Picture = {
		id: string
		userId: User["id"]
		name: string
		isPrincipal: boolean
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
