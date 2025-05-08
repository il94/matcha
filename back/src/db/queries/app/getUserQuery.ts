export const getUserQuery = `
	SELECT
		users.*,
		JSONB_AGG(JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = TRUE) -> 0 AS principal_picture,
		COALESCE(JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = FALSE), '[]') AS pictures,
		COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags
	FROM users
	LEFT JOIN pictures ON pictures.user_id = users.id
	LEFT JOIN user_tags ON user_tags.user_id = users.id
	LEFT JOIN tags ON tags.id = user_tags.tag_id
	WHERE users.id = $1
	GROUP BY users.id;
`
