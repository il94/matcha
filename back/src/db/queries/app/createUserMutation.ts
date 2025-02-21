export const createUserMutation = `
	INSERT INTO users (
		password,
		first_name,
		last_name,
		username,
		email
	)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id;
`
