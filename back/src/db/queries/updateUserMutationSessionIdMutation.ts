export const updateUserSessionIdMutation = `
	UPDATE users
	SET session_id = $2
	WHERE id = $1
`
