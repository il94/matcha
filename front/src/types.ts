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

		elo: number
		views: number
		matchs: number
		dates: number
	}
}