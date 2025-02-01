type PostUserBody = Omit<UserData, "id" | "createdAt">

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