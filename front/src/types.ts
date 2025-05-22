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

		views: number
		likes: number
		elo: number
		matchs: number

		isLiked?: boolean
		isDisliked?: boolean
		heLiked?: boolean
		isMatched?: boolean
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
		lastMessage?: Message
	}

	type Message = {
		createdAt: string
		authorId: User["id"]
		content: string
		avatar: Picture["name"]
	}
}
