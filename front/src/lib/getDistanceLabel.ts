export default function getDistanceLabel(distance?: number) {
	if (!distance) return "0 m"

	if (distance < 1) return `${Math.round(distance * 1000)} m`

	return `${Math.round(distance)} km`
}
