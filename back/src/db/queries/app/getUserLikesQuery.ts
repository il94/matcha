export const getUserLikesQuery = `
	SELECT
		users.id,
		users.first_name,
		JSONB_AGG(JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = TRUE) -> 0 AS principal_picture
	FROM users
	LEFT JOIN pictures ON pictures.user_id = users.id and pictures.is_principal = TRUE
	INNER JOIN votes ON votes.user_id = users.id AND votes.liked = TRUE
	WHERE votes.target_id = $1
	GROUP BY users.id
`
