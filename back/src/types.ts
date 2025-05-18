import { FromSchema, JSONSchema } from "json-schema-to-ts"

declare global {
	type PostUserBody = Omit<UserData, "id" | "createdAt">

	type GetUsersQuery = {
		page: number
		limit: number
	}

	type UserData = {
		id: string
		createdAt: string
		sessionId: string | null

		password: string
		firstName: string
		lastName: string
		username: string
		email: string

		birthDate?: string
		sexualOrientation?: string
		gender?: string
		bio?: string
		elo: number
		views: number
		matchs: number
		dates: number

		activated: boolean
		completed: boolean

		principalPicture: PictureData
		pictures: PictureData[]
		tags: TagData["id"][]
	}

	type PictureData = {
		id: string
		name: string
		isPrincipal: boolean
	}

	type TagData = {
		id: number
		name: string
	}

	type ChatData = {
		id: string
		userId1: UserData["id"]
		userId2: UserData["id"]

		title: UserData["firstName"]
		avatar: PictureData["name"]
		messages: MessageData[]
		lastMessage: MessageData
	}

	type MessageData = {
		createdAt: string
		chatId: ChatData["id"]
		authorId: UserData["id"]

		content: string
	}
}
