export const activateUserMutation = `
	UPDATE users
	SET session_id = $2, activated = TRUE
	WHERE id = $1;
`
