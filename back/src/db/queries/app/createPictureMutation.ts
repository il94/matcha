export const createPictureMutation = `
	INSERT INTO pictures (
		user_id,
		name,
		is_principal
	)
	VALUES ($1, $2, $3);
`
