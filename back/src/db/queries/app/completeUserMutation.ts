export const completeUserMutation = `
	UPDATE users
	SET
		session_id = $2,

		longitude = $3,
		latitude = $4,
		location_label = $5,
		location_source = $6,

		birth_date = $7,
		gender = $8,
		sexual_orientation = $9,
		bio = $10,
		completed = TRUE
	WHERE id = $1;
`
