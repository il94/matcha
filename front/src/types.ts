import { PanInfo } from "motion/react"

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
		images: string[]

		tags: Tag[]

		elo: number
		views: number
		matchs: number
		dates: number
	}

	type Image = {
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
		avatar: Image["name"]
		lastMessage: {
			content: Message["content"]
			createdAt: Message["createdAt"]
		}
	}

	type Message = {
		id: string
		createdAt: string
		chatId: Chat["id"]
		authorId: User["id"]
		content: string
		avatar: Image["name"]
	}
}

export type FramerCallback = (
	_: globalThis.MouseEvent | TouchEvent | PointerEvent,
	info: PanInfo,
) => void
