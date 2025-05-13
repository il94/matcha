export const getUserPicturesQuery = `
	SELECT id, name
	FROM pictures
	WHERE user_id = $1;
`
