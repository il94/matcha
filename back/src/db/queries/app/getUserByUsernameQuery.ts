export const getUserByUsernameQuery = `
	SELECT
		id,
		password,
		session_id,
		completed
	FROM users
	WHERE username = $1;
`
