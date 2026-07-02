import { faker } from "@faker-js/faker"
import { cities } from "./cities"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"

export const MALE_PICTURE_URL = "https://randomuser.me/api/portraits/men/32.jpg"
export const FEMALE_PICTURE_URL =
	"https://randomuser.me/api/portraits/women/44.jpg"

export const SEED_PASSWORD = "password"

const GENERATED_COUNT = 5

const GENDERS = Object.values(Gender)
const ORIENTATIONS = Object.values(SexualOrientation)

const TAG_NAMES = [
	"Technology",
	"Gaming",
	"Travel",
	"Sports",
	"Music",
	"Cooking",
	"Art",
	"Photography",
	"Fashion",
	"Movies",
	"Books",
	"Nature",
	"Hiking",
	"Reading",
	"Yoga",
	"Painting",
	"Writing",
	"Anime",
	"Gardening",
	"Meditation",
	"Coding",
	"Architecture",
	"Theater",
	"Cycling",
	"Running",
	"Adventure",
	"Social Media",
	"Volunteering",
	"Startups",
	"Design",
	"Interior Design",
	"Music Production",
	"Astronomy",
	"Swimming",
	"Beach",
	"Comedy",
	"Technology News",
	"History",
	"Entrepreneurship",
	"DIY",
	"Traveling Abroad",
	"Mental Health",
	"Sustainability",
	"Philosophy",
]

type SeedUser = {
	data: (string | number | boolean)[]
	tags: string[]
}

faker.seed(42)

function pictureForSex(sex: "male" | "female") {
	return sex === "male" ? MALE_PICTURE_URL : FEMALE_PICTURE_URL
}

// "sex" (male/female) ne sert qu'à choisir le prénom et la photo, séparément
// du "gender" stocké en base : il n'y a pas de photo "Other", donc on tire un
// sexe au hasard dans ce cas.
function sexForGender(gender: Gender): "male" | "female" {
	if (gender === Gender.MALE) return "male"
	if (gender === Gender.FEMALE) return "female"
	return faker.helpers.arrayElement(["male", "female"] as const)
}

function jitter() {
	return faker.number.float({ min: -0.05, max: 0.05, fractionDigits: 4 })
}

function buildUser(
	firstName: string,
	lastName: string,
	username: string,
	email: string,
	gender: (typeof GENDERS)[number],
	sex: "male" | "female",
): { user: SeedUser; picture: string } {
	const city = faker.helpers.arrayElement(cities)
	const longitude = city.longitude + jitter()
	const latitude = city.latitude + jitter()

	const user: SeedUser = {
		data: [
			SEED_PASSWORD,
			firstName,
			lastName,
			username,
			email,
			faker.date
				.birthdate({ min: 18, max: 80, mode: "age" })
				.toISOString()
				.slice(0, 10),
			faker.helpers.arrayElement(ORIENTATIONS),
			gender,
			faker.lorem.sentences(2).slice(0, 256),
			faker.number.int({ min: 0, max: 1000 }),
			faker.datatype.boolean(),
			faker.date.recent({ days: 30 }).toISOString(),
			true,
			true,
			longitude,
			latitude,
			city.label,
			"gps",
		],
		tags: faker.helpers.arrayElements(TAG_NAMES, { min: 2, max: 5 }),
	}

	return { user, picture: pictureForSex(sex) }
}

// Comptes de test fixes (préservent POST /admin/chats et un login connu).
const FIXED_ACCOUNTS: {
	firstName: string
	lastName: string
	username: string
	gender: Gender
}[] = [
	{
		firstName: "Ilyes",
		lastName: "Landolsi",
		username: "ilandols",
		gender: Gender.MALE,
	},
	{
		firstName: "Kylian",
		lastName: "Mbappe",
		username: "mbappe",
		gender: Gender.MALE,
	},
	{
		firstName: "Hermione",
		lastName: "Granger",
		username: "hermione",
		gender: Gender.FEMALE,
	},
	{
		firstName: "Harley",
		lastName: "Quinn",
		username: "harleyquinn",
		gender: Gender.FEMALE,
	},
]

function generate(): { users: SeedUser[]; pictures: string[][] } {
	const users: SeedUser[] = []
	const pictures: string[][] = []

	for (const account of FIXED_ACCOUNTS) {
		const { user, picture } = buildUser(
			account.firstName,
			account.lastName,
			account.username,
			`${account.username}@matcha.fr`,
			account.gender,
			sexForGender(account.gender),
		)
		users.push(user)
		pictures.push([picture])
	}

	for (let i = 0; i < GENERATED_COUNT; i++) {
		const gender = faker.helpers.arrayElement(GENDERS)
		const sex = sexForGender(gender)

		const firstName = faker.person.firstName(sex)
		const lastName = faker.person.lastName(sex)
		// Username unique garanti par le suffixe d'index ; borné à 32 chars.
		const username =
			`${firstName.toLowerCase().replace(/[^a-z0-9]/g, "")}${i}`.slice(0, 32)
		const email = `user${i}@matcha.fr`

		const { user, picture } = buildUser(
			firstName,
			lastName,
			username,
			email,
			gender,
			sex,
		)
		users.push(user)
		pictures.push([picture])
	}

	return { users, pictures }
}

const { users, pictures } = generate()

export { users, pictures }
