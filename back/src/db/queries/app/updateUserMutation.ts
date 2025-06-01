export const updateUserMutation = `
	UPDATE users
	SET
		first_name = COALESCE(($2::jsonb)->>'firstName', first_name),
		last_name = COALESCE(($2::jsonb)->>'lastName', last_name),
		username = COALESCE(($2::jsonb)->>'username', username),
		email = COALESCE(($2::jsonb)->>'email', email),
		password = COALESCE(($2::jsonb)->>'password', password),
		longitude = COALESCE((($2::jsonb)->>'longitude')::double precision, longitude),
		latitude = COALESCE((($2::jsonb)->>'latitude')::double precision, latitude),
		location_label = COALESCE(($2::jsonb)->>'locationLabel', location_label),
		location_source = COALESCE(($2::jsonb)->>'locationSource', location_source),
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
		bio = COALESCE(($2::jsonb)->>'bio', bio),
		is_online = COALESCE((($2::jsonb)->>'isOnline')::boolean, is_online),
		last_connexion = COALESCE((($2::jsonb)->>'lastConnexion')::timestamp, last_connexion)
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
