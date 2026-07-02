export const getUserQuery = `
	SELECT
		users.id,
		users.first_name,
		users.last_name,
		users.username,
		users.birth_date,
		users.longitude,
		users.latitude,
		users.location_label,
		users.location_source,
		(
			6371 * acos(
				cos(radians(ref_user.latitude)) * cos(radians(users.latitude)) *
				cos(radians(users.longitude) - radians(ref_user.longitude)) +
				sin(radians(ref_user.latitude)) * sin(radians(users.latitude))
			)
		) AS distance,
		users.gender,
		users.sexual_orientation,
		users.bio,
		users.elo,
		users.is_online,
		users.last_connexion,
		JSONB_AGG(JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = TRUE) -> 0 AS principal_picture,
		COALESCE(JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = FALSE), '[]') AS pictures,
		COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags,

		COUNT(DISTINCT votes.user_id) FILTER (WHERE votes.liked = TRUE) AS likes,
		(SELECT COUNT(*) FROM views WHERE views.target_id = users.id) AS views,
		(
			SELECT COUNT(*)
			FROM votes uv1
			JOIN votes uv2
				ON uv1.user_id = uv2.target_id
				AND uv1.target_id = uv2.user_id
			WHERE uv1.target_id = users.id
				AND uv1.liked = TRUE
				AND uv2.liked = TRUE
		) AS matchs,
		
		EXISTS(SELECT 1 FROM votes WHERE user_id = $2 AND target_id = $1 AND liked = TRUE) AS is_liked,
		EXISTS(SELECT 1 FROM votes WHERE user_id = $2 AND target_id = $1 AND liked = FALSE) AS is_disliked,
		EXISTS(SELECT 1 FROM votes WHERE user_id = $1 AND target_id = $2 AND liked = TRUE) AS he_liked,
		EXISTS(SELECT 1 FROM votes v1 JOIN votes v2 ON v1.user_id = v2.target_id AND v1.target_id = v2.user_id WHERE v1.user_id = $2 AND v1.target_id = $1 AND v1.liked = TRUE AND v2.liked = TRUE) AS is_matched

	FROM users
	JOIN (SELECT latitude, longitude FROM users WHERE id = $2) AS ref_user ON TRUE
	LEFT JOIN pictures ON pictures.user_id = users.id
	LEFT JOIN user_tags ON user_tags.user_id = users.id
	LEFT JOIN tags ON tags.id = user_tags.tag_id
	LEFT JOIN votes ON votes.target_id = users.id
	WHERE users.id = $1
  GROUP BY users.id, ref_user.latitude, ref_user.longitude;
`
