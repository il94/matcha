type ID<Entity extends { id?: any }> = NonNullable<Entity["id"]>

type PostUserBody = Omit<UserData, "id" | "createdAt">

type GetUsersQuery = {
	page: number
	limit: number
}

type UserData = {
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

	tags: TagData[]

	elo: number
	views: number
	matchs: number
	dates: number
}

type TagData = {
	id: number
	name: string
}

type ChatData = {
	id: string
	userId1: UserData["id"]
	userId2: UserData["id"]
}

type MessageData = {
	id: string
	createdAt: string

	chatId: ChatData["id"]
	authorId: UserData["id"]
	content: string
}
