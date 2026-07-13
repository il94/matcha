export const getUserPasswordQuery = `
	SELECT password
	FROM users
	WHERE id = $1;
`
