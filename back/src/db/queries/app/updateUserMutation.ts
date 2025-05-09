export const updateUserMutation = `
	UPDATE users
	SET
		first_name = COALESCE(($2::jsonb)->>'firstName', first_name),
		last_name = COALESCE(($2::jsonb)->>'lastName', last_name),
		username = COALESCE(($2::jsonb)->>'username', username),
		email = COALESCE(($2::jsonb)->>'email', email),
		birth_date = COALESCE(($2::jsonb)->>'birthDate', birth_date),
		gender = CASE 
			WHEN ($2::jsonb)->>'gender' IS NOT NULL 
			THEN (($2::jsonb)->>'gender')::gender 
			ELSE gender 
		END,
		sexual_orientation = CASE 
			WHEN ($2::jsonb)->>'sexualOrientation' IS NOT NULL 
			THEN (($2::jsonb)->>'sexualOrientation')::sexual_orientation 
			ELSE sexual_orientation 
		END,
		bio = COALESCE(($2::jsonb)->>'bio', bio)
	WHERE id = $1
	RETURNING *;
`

export const updateUserEmailMutation = `
	UPDATE users
	SET email = $2
	WHERE id = $1;
`

export const updateUserUsernameMutation = `
	UPDATE users
	SET username = $2
	WHERE id = $1;
`

export const updateUserFirstNameMutation = `
	UPDATE users
	SET first_name = $2
	WHERE id = $1;
`

export const updateUserLastNameMutation = `
	UPDATE users
	SET last_name = $2
	WHERE id = $1;
`

export const updateUserPasswordMutation = `
	UPDATE users
	SET password = $2
	WHERE id = $1;
`

export const updateUserSessionIdMutation = `
	UPDATE users
	SET session_id = $2
	WHERE id = $1;
`
