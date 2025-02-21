export const completeUserMutation = `
	UPDATE users
	SET
		session_id = $2,
		birth_date = $3,
		gender = $4,
		sexual_orientation = $5,
		bio = $6,
		completed = TRUE
	WHERE id = $1;
`
