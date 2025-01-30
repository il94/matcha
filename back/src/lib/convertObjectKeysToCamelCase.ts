function toCamelCase(str: string): string {
	return str
		.replace(/_./g, (match) => match.charAt(1).toUpperCase())
		.replace(/^./, (match) => match.toLowerCase())
}

export default function convertObjectKeysToCamelCase(
	array: Record<string, unknown>[],
) {
	return array.map((item) => {
		const newItem: any = {}

		Object.keys(item).forEach((key) => {
			const camelCaseKey = toCamelCase(key)
			newItem[camelCaseKey] = item[key]
		})

		return newItem
	})
}
