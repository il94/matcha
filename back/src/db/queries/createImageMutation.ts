export const createImageMutation = `
	INSERT INTO images (
		user_id,
		name
	)
	VALUES ($1, $2)
`
