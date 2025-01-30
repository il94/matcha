type PostUserBody = Omit<UserData, "id" | "createdAt">

type UserData = {
	id: string
	createdAt: string
	firstName: string
	lastName: string
	userName: string
	email: string
	birthDate: string
	sexuality: string
	gender?: string

	bio?: string
	images: string[]

	elo: number
	views: number
	matchs: number
	dates: number
}
