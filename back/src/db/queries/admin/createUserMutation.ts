export const createUserMutation = `
	INSERT INTO users (
		password,
		first_name,
		last_name,
		username,
		email,
		
		birth_date,
		sexual_orientation,
		gender,
		bio,
		elo,
		views,
		matchs,
		dates,

		activated,
		completed
	)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
	RETURNING id;
`
