export const getUserQuery = `
	SELECT
		users.*,
		JSONB_AGG(JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = TRUE) -> 0 AS principal_picture,
		COALESCE(JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = FALSE), '[]') AS pictures,
		COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags,

		COUNT(DISTINCT votes.user_id) FILTER (WHERE votes.liked = TRUE) AS likes,
		COUNT(DISTINCT votes.user_id) AS views,
		(
			SELECT COUNT(*)
			FROM votes uv1
			JOIN votes uv2
				ON uv1.user_id = uv2.target_id
				AND uv1.target_id = uv2.user_id
			WHERE uv1.target_id = users.id
				AND uv1.liked = TRUE
				AND uv2.liked = TRUE
		) AS matchs

	FROM users
	LEFT JOIN pictures ON pictures.user_id = users.id
	LEFT JOIN user_tags ON user_tags.user_id = users.id
	LEFT JOIN tags ON tags.id = user_tags.tag_id
	LEFT JOIN votes ON votes.target_id = users.id
	WHERE users.id = $1
	GROUP BY users.id;
`
