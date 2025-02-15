export const getUserByUsernameQuery = `
	SELECT
		id,
		password
	FROM users
	WHERE username = $1
`
