export const getUserByUsernameQuery = `
	SELECT
		id,
		password,
		session_id
	FROM users
	WHERE username = $1;
`
