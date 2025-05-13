export const deleteUserPicturesMutation = `
	DELETE FROM pictures
	WHERE user_id = $1;
`
