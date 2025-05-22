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

		is_online,
		last_connexion,

		activated,
		completed
	)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
	RETURNING id;
`
