export const createUserMutation = `
	INSERT INTO users (
		first_name,
		last_name,
		user_name,
		email,
		birth_date,
		sexual_orientation,
		
		gender,
		bio,
		elo,
		views,
		matchs,
		dates
	) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
`
