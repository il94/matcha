export type City = {
	label: string
	latitude: number
	longitude: number
}

// Villes françaises servant de clusters pour disperser les profils générés.
// Le générateur ajoute un léger jitter autour de ces centres pour que le
// matching par proximité (IV.3) et la recherche par localisation (IV.4) soient
// testables sans aucun appel Nominatim au moment du seed.
export const cities: City[] = [
	{
		label: "Paris, Île-de-France, France",
		latitude: 48.8566,
		longitude: 2.3522,
	},
	{
		label: "Lyon, Auvergne-Rhône-Alpes, France",
		latitude: 45.764,
		longitude: 4.8357,
	},
	{
		label: "Marseille, Provence-Alpes-Côte d'Azur, France",
		latitude: 43.2965,
		longitude: 5.3698,
	},
	{
		label: "Toulouse, Occitanie, France",
		latitude: 43.6047,
		longitude: 1.4442,
	},
	{
		label: "Bordeaux, Nouvelle-Aquitaine, France",
		latitude: 44.8378,
		longitude: -0.5792,
	},
	{
		label: "Lille, Hauts-de-France, France",
		latitude: 50.6292,
		longitude: 3.0573,
	},
	{
		label: "Nantes, Pays de la Loire, France",
		latitude: 47.2184,
		longitude: -1.5536,
	},
	{
		label: "Strasbourg, Grand Est, France",
		latitude: 48.5734,
		longitude: 7.7521,
	},
	{
		label: "Nice, Provence-Alpes-Côte d'Azur, France",
		latitude: 43.7102,
		longitude: 7.262,
	},
	{ label: "Rennes, Bretagne, France", latitude: 48.1173, longitude: -1.6778 },
	{
		label: "Montpellier, Occitanie, France",
		latitude: 43.6108,
		longitude: 3.8767,
	},
	{
		label: "Grenoble, Auvergne-Rhône-Alpes, France",
		latitude: 45.1885,
		longitude: 5.7245,
	},
]
