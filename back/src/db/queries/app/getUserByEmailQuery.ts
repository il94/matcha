export const getUserByEmailQuery = `
	SELECT
		id
	FROM users
	WHERE email = $1;
`
