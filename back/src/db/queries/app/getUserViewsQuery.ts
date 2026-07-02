export const getUserViewsQuery = `
	SELECT
		users.id,
		users.first_name,
		JSONB_AGG(JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = TRUE) -> 0 AS principal_picture
	FROM users
	LEFT JOIN pictures ON pictures.user_id = users.id and pictures.is_principal = TRUE
	INNER JOIN views ON views.user_id = users.id
	WHERE views.target_id = $1
	GROUP BY users.id, views.created_at
	ORDER BY views.created_at DESC
`
