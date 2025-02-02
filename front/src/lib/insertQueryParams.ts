export const insertQueryParams = (
	records: Record<string, string | number | boolean | null | undefined>,
) => {
	return Object.entries(records).reduce(
		(acc, [key, value]) => `${acc}${value ? `${key}=${value}&` : ""}`,
		"",
	)
}
