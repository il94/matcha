export const createImageMutation = `
	INSERT INTO images (
		user_id,
		name,
		is_principal
	)
	VALUES ($1, $2, $3)
`
