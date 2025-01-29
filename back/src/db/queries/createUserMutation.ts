export const createUserMutation = `
	INSERT INTO users (
		first_name,
		last_name,
		user_name,
		email,
		birth_date,
		gender,
		sexuality
	) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
`
