import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"

const schemasModels = {
	id: { type: "string", format: "uuid" } as const,
	username: {
		type: "string",
		minLength: 1,
		maxLength: 32,
	} as const,
	passwordLogin: { type: "string", minLength: 1, maxLength: 128 } as const,
	password: {
		type: "string",
		minLength: 8,
		maxLength: 128,
		allOf: [
			{ pattern: "[a-z]" },
			{ pattern: "[A-Z]" },
			{ pattern: "[0-9]" },
			{ pattern: '[!@#$%^&*(),.?":{}|<>]' },
		],
	} as const,
	firstName: { type: "string", minLength: 1, maxLength: 64 } as const,
	lastName: { type: "string", minLength: 1, maxLength: 64 } as const,
	email: {
		type: "string",
		minLength: 1,
		maxLength: 256,
		format: "email",
	} as const,
	birthDate: { type: "string", format: "date", adult: true } as const,
	gender: { type: "string", enum: Object.values(Gender) } as const,
	sexualOrientation: {
		type: "string",
		enum: Object.values(SexualOrientation),
	} as const,
	tags: {
		type: "string",
		pattern: "^(\\[\\d+(?:,\\s*\\d+)*\\]|\\[\\])$",
	} as const,
	bio: { type: "string", maxLength: 256 } as const,
	principalPicture: { type: "object", format: "binary" } as const,
	secondaryPicture1: { type: "object" } as const,
	secondaryPicture2: { type: "object" } as const,
	secondaryPicture3: { type: "object" } as const,
	secondaryPicture4: { type: "object" } as const,
}

export default schemasModels
