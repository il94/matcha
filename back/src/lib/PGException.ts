export function isPGError(
	error: unknown,
): error is { message: string; constraint: string } {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		"constraint" in error
	)
}

export class PGException {
	message: string
	constraint: string
	constructor(message: string, constraint: string) {
		this.message = message
		this.constraint = constraint
	}
}
