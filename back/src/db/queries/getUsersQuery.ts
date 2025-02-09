export const getUsersQuery = `
	SELECT
		users.*,
		JSON_AGG(DISTINCT images.name) AS image_names,
		COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags
	FROM users
	LEFT JOIN images ON images.user_id = users.id
	LEFT JOIN user_tags ON user_tags.user_id = users.id
	LEFT JOIN tags ON tags.id = user_tags.tag_id
	GROUP BY users.id
	OFFSET ($1 - 1) * $2
	LIMIT $2
`
