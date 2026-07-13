export const hasPrincipalPictureQuery = `
	SELECT 1
	FROM pictures
	WHERE user_id = $1 AND is_principal = TRUE
	LIMIT 1;
`
