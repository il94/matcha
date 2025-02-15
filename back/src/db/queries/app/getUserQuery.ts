export const getUserQuery = `
	SELECT
		users.*,
		JSON_AGG(DISTINCT pictures.name) AS picture_names,
		COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags
	FROM users
	LEFT JOIN pictures ON pictures.user_id = users.id
	LEFT JOIN user_tags ON user_tags.user_id = users.id
	LEFT JOIN tags ON tags.id = user_tags.tag_id
	WHERE users.id = $1
	GROUP BY users.id;
`
