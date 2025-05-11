export const deleteUserTagsMutation = `
	DELETE FROM user_tags WHERE user_id = $1;
`
