export const isUserCompleted = `
	SELECT completed
	FROM users
	WHERE id = $1;
`
