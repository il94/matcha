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

		longitude?: number
		latitude?: number
		locationLabel?: string
		locationSource: "gps" | "manual"
		distance: number

		birthDate?: string
		sexualOrientation?: string
		gender?: string
		bio?: string
		views: number
		likes: number
		matchs: number
		elo: number

		isOnline: boolean
		lastConnexion?: string

		activated: boolean
		completed: boolean

		principalPicture: PictureData
		pictures: PictureData[]
		tags: TagData["id"][]

		isLiked?: boolean
		isDisliked?: boolean
		heLiked?: boolean
		isMatched?: boolean
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

	type NotificationType = "like" | "match" | "view" | "unlike"

	type NotificationData = {
		id: string
		type: NotificationType
		read: boolean
		createdAt: string
		sender: {
			id: UserData["id"]
			username: UserData["username"]
			firstName: UserData["firstName"]
			avatar: PictureData["name"]
		}
	}
}

export type NominatimLocation = {
	lat: string
	lon: string
	address: {
		road?: string
		suburb?: string
		city?: string
		region?: string
		postcode?: string
		country: string
	}
	error: string | null
}
