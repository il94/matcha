import { faker } from "@faker-js/faker"
import { cities } from "./cities"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"
import {
	REAL_CHARACTERS,
	FICTIONAL_CHARACTERS,
	DOMAIN_INFO,
	CLOSINGS,
	USERNAME_OVERRIDES,
	CharacterRow,
	CharacterGender,
	CharacterOrientation,
	Domain,
} from "./characters"
import { CHARACTER_PICTURES } from "./characterPictures"

export type SeedUser = {
	data: (string | number | boolean)[]
	tags: string[]
}

faker.seed(42)

function jitter() {
	return faker.number.float({ min: -0.05, max: 0.05, fractionDigits: 4 })
}

// Score Elo réaliste : un nouveau profil démarre à 300 (le plancher) et peut
// grimper jusqu'à 1000. On tire une valeur suivant une loi normale (courbe en
// cloche) via Box-Muller, centrée bas et tronquée sur [300, 1000]. Résultat :
// la grande majorité des profils reste dans la tranche basse/moyenne, une
// minorité seulement atteint le sommet du classement — comme une vraie
// population de notes Elo.
const SCORE_MIN = 300
const SCORE_MAX = 1000
const SCORE_MEAN = 450
const SCORE_STD = 140

function realisticScore(): number {
	const u1 = faker.number.float({ min: 1e-6, max: 1, fractionDigits: 6 })
	const u2 = faker.number.float({ min: 0, max: 1, fractionDigits: 6 })
	const normal = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)

	const score = Math.round(SCORE_MEAN + normal * SCORE_STD)
	return Math.min(SCORE_MAX, Math.max(SCORE_MIN, score))
}

// Dérive un pseudo à partir de l'identité : nom de famille en priorité (le
// plus proche d'un vrai pseudo public), puis prénom, puis les deux combinés,
// avec un suffixe numérique en dernier recours pour garantir l'unicité.
const takenUsernames = new Set<string>()

function slugify(value: string): string {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "")
}

function makeUsername(firstName: string, lastName: string): string {
	const override = USERNAME_OVERRIDES[`${firstName} ${lastName}`]
	if (override) {
		takenUsernames.add(override)
		return override
	}

	const candidates = [
		slugify(lastName),
		slugify(firstName),
		slugify(`${firstName}${lastName}`),
	]

	for (const candidate of candidates) {
		if (candidate.length >= 3 && !takenUsernames.has(candidate)) {
			takenUsernames.add(candidate)
			return candidate.slice(0, 32)
		}
	}

	const base = slugify(`${firstName}${lastName}`).slice(0, 28) || "user"
	let suffix = 2
	let username = `${base}${suffix}`.slice(0, 32)
	while (takenUsernames.has(username)) {
		suffix += 1
		username = `${base}${suffix}`.slice(0, 32)
	}
	takenUsernames.add(username)
	return username
}

function genderFromCode(code: CharacterGender): Gender {
	if (code === "M") return Gender.MALE
	if (code === "F") return Gender.FEMALE
	return Gender.UNDEFINED
}

// Un genre "Undefined" force une orientation "Bi" (règle déjà appliquée par
// l'application pour les comptes créés via le formulaire d'inscription).
function orientationFromCode(
	code: CharacterOrientation,
	gender: Gender,
): string {
	if (gender === Gender.UNDEFINED) return SexualOrientation.BI
	if (code === "G") return SexualOrientation.GAY
	if (code === "B") return SexualOrientation.BI
	return SexualOrientation.STRAIGHT
}

function buildBio(domain: Domain, detail: string, index: number): string {
	const info = DOMAIN_INFO[domain]
	const middle = info.middle[index % info.middle.length]
	const closing = CLOSINGS[index % CLOSINGS.length]
	return `${detail}. ${middle} ${closing}`.slice(0, 256)
}

function buildTags(domain: Domain): string[] {
	const info = DOMAIN_INFO[domain]
	const rest = info.pool.filter((tag) => tag !== info.primaryTag)
	const extra = faker.helpers.arrayElements(rest, { min: 1, max: 4 })
	return [info.primaryTag, ...extra]
}

function buildCharacterUser(row: CharacterRow, index: number): SeedUser {
	const [
		firstName,
		lastName,
		genderCode,
		orientationCode,
		birthDate,
		domain,
		detail,
	] = row

	const gender = genderFromCode(genderCode)
	const orientation = orientationFromCode(orientationCode, gender)
	const username = makeUsername(firstName, lastName)
	const email = `${username}@matcha.fr`

	const city = faker.helpers.arrayElement(cities)
	const longitude = city.longitude + jitter()
	const latitude = city.latitude + jitter()

	return {
		data: [
			process.env.SEED_PASSWORD || "password",
			firstName,
			lastName,
			username,
			email,
			birthDate,
			orientation,
			gender,
			buildBio(domain, detail, index),
			realisticScore(),
			faker.datatype.boolean(),
			faker.date.recent({ days: 30 }).toISOString(),
			true,
			true,
			longitude,
			latitude,
			city.label,
			"gps",
		],
		tags: buildTags(domain),
	}
}

// Compte de développement fixe (login connu pour les tests manuels), ce n'est
// pas un personnage et reste donc en dehors des 500 profils générés.
function buildDevUser(): SeedUser {
	const username = process.env.DEV_USER_USERNAME ?? faker.internet.username()
	takenUsernames.add(username)

	const city = faker.helpers.arrayElement(cities)
	const longitude = city.longitude + jitter()
	const latitude = city.latitude + jitter()

	return {
		data: [
			process.env.SEED_PASSWORD || "password",
			process.env.DEV_USER_FIRSTNAME ?? faker.person.firstName(),
			process.env.DEV_USER_LASTNAME ?? faker.person.lastName(),
			username,
			process.env.DEV_USER_EMAIL ?? faker.internet.email(),
			faker.date
				.birthdate({ min: 18, max: 40, mode: "age" })
				.toISOString()
				.slice(0, 10),
			SexualOrientation.STRAIGHT,
			Gender.MALE,
			"Développeur de Matcha, ici pour tester l'application de bout en bout.",
			300,
			true,
			faker.date.recent({ days: 1 }).toISOString(),
			true,
			true,
			longitude,
			latitude,
			city.label,
			"gps",
		],
		tags: ["Technology", "Coding", "Travel"],
	}
}

// Avatar générique pour le compte dev : une photo est requise pour que
// `completed = true` reste cohérent avec le reste de l'app. Le seed est un
// identifiant neutre, sans lien avec l'identité réelle du développeur.
const DEV_USER_AVATAR =
	process.env.DEV_USER_AVATAR ??
	"https://api.dicebear.com/9.x/identicon/svg?seed=matcha-dev-account"

function generate(): { users: SeedUser[]; pictures: string[][] } {
	const users: SeedUser[] = []
	const pictures: string[][] = []

	const characters = [...REAL_CHARACTERS, ...FICTIONAL_CHARACTERS]
	characters.forEach((row, index) => {
		users.push(buildCharacterUser(row, index))
		pictures.push(CHARACTER_PICTURES[`${row[0]} ${row[1]}`] ?? [])
	})

	return { users, pictures }
}

// Le compte dev est construit AVANT les personnages, et volontairement hors de
// `users` : il est seedé séparément par `npm run seed:dev` (cf. seed.dev.ts).
// Le construire en premier préserve deux invariants :
//  - il réserve son pseudo (aucun personnage ne peut le reprendre) ;
//  - il consomme ses tirages faker avant les personnages, ce qui laisse le
//    dataset des ~500 profils identique à l'ordre historique.
const devUser = buildDevUser()
const devUserPictures = [DEV_USER_AVATAR]

const { users, pictures } = generate()

export { users, pictures, devUser, devUserPictures }
