export const deleteUserMutation = `
	DELETE FROM users
	WHERE id = $1;
`
