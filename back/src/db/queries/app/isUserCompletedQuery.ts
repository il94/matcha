export const isUserCompletedQuery = `
	SELECT completed
	FROM users
	WHERE id = $1;
`
