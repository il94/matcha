export const getUsersQuery = `
	SELECT
		users.id,
		users.first_name,
		users.last_name,
		users.username,
		users.birth_date,
		users.sexual_orientation,
		users.gender,
		users.bio,
		users.elo,
		JSONB_AGG(JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = TRUE) -> 0 AS principal_picture,
		JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = FALSE) AS pictures,
		COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags
	FROM users
	LEFT JOIN pictures ON pictures.user_id = users.id
	LEFT JOIN user_tags ON user_tags.user_id = users.id
	LEFT JOIN tags ON tags.id = user_tags.tag_id
	GROUP BY users.id
	OFFSET ($1 - 1) * $2
	LIMIT $2;
`
