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
		JSON_AGG(DISTINCT pictures.name) AS picture_names,
		COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags
	FROM users
	LEFT JOIN pictures ON pictures.user_id = users.id
	LEFT JOIN user_tags ON user_tags.user_id = users.id
	LEFT JOIN tags ON tags.id = user_tags.tag_id
	GROUP BY users.id
	OFFSET ($1 - 1) * $2
	LIMIT $2;
`
