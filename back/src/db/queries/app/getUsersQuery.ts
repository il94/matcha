export type GetUsersSortBy = "age" | "distance" | "elo" | "tags"

export type GetUsersFilters = {
	minAge?: number
	maxAge?: number
	maxDistance?: number
	minElo?: number
	maxElo?: number
	tags?: number[]
	sortBy?: GetUsersSortBy
	order?: "asc" | "desc"
}

export const getUsersQuery = `
	SELECT * FROM (
		SELECT
			users.id,
			users.first_name,
			users.last_name,
			users.username,
			users.birth_date,
			users.sexual_orientation,
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
			EXTRACT(YEAR FROM AGE(users.birth_date::date)) AS age,
			(
				SELECT COUNT(*)
				FROM user_tags ut
				WHERE ut.user_id = users.id
					AND ut.tag_id IN (SELECT tag_id FROM user_tags WHERE user_id = $1)
			) AS common_tags,
			users.gender,
			users.bio,
			users.elo,
			users.is_online,
			users.last_connexion,
			JSONB_AGG(JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = TRUE) -> 0 AS principal_picture,
			COALESCE(JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', pictures.name)) FILTER (WHERE pictures.is_principal = FALSE), '[]') AS pictures,
			COALESCE(JSON_AGG(DISTINCT tags) FILTER (WHERE tags IS NOT NULL), '[]') AS tags,

			EXISTS(SELECT 1 FROM votes WHERE user_id = $1 AND target_id = users.id AND liked = TRUE) AS is_liked,
			EXISTS(SELECT 1 FROM votes WHERE user_id = $1 AND target_id = users.id AND liked = false) AS is_disliked,
			EXISTS(SELECT 1 FROM votes WHERE user_id = users.id AND target_id = $1 AND liked = TRUE) AS he_liked,
			EXISTS(SELECT 1 FROM votes v1 JOIN votes v2 ON v1.user_id = v2.target_id AND v1.target_id = v2.user_id WHERE v1.user_id = $1 AND v1.target_id = users.id AND v1.liked = TRUE AND v2.liked = TRUE) AS is_matched

		FROM users
		JOIN (SELECT latitude, longitude, gender, sexual_orientation FROM users WHERE id = $1) AS ref_user ON TRUE
		LEFT JOIN pictures ON pictures.user_id = users.id
		LEFT JOIN user_tags ON user_tags.user_id = users.id
		LEFT JOIN tags ON tags.id = user_tags.tag_id
		WHERE completed = TRUE
			AND users.id != $1
			AND users.id NOT IN (
				SELECT target_id
				FROM votes
				WHERE user_id = $1
			)
			AND users.id NOT IN (
			SELECT CASE
				WHEN user_id_1 = $1 THEN user_id_2
				WHEN user_id_2 = $1 THEN user_id_1
			END
			FROM user_blocks
			WHERE user_id_1 = $1 OR user_id_2 = $1
		)
			AND (
				ref_user.sexual_orientation IS NULL
				OR ref_user.sexual_orientation = 'Bi'
				OR ref_user.gender IS NULL OR ref_user.gender = 'Undefined'
				OR (ref_user.sexual_orientation = 'Straight' AND users.gender IN ('Male', 'Female') AND users.gender <> ref_user.gender)
				OR (ref_user.sexual_orientation = 'Gay'      AND users.gender = ref_user.gender)
			)
			AND (
				users.sexual_orientation IS NULL
				OR users.sexual_orientation = 'Bi'
				OR users.gender IS NULL OR users.gender = 'Undefined'
				OR (users.sexual_orientation = 'Straight' AND ref_user.gender IN ('Male', 'Female') AND ref_user.gender <> users.gender)
				OR (users.sexual_orientation = 'Gay'      AND ref_user.gender = users.gender)
			)
		GROUP BY users.id, ref_user.latitude, ref_user.longitude
	) AS sub
	WHERE ($3::int IS NULL OR sub.age >= $3)
		AND ($4::int IS NULL OR sub.age <= $4)
		AND ($5::float8 IS NULL OR sub.distance <= $5)
		AND ($6::int IS NULL OR sub.elo >= $6)
		AND ($7::int IS NULL OR sub.elo <= $7)
		AND ($8::int[] IS NULL OR sub.id IN (
			SELECT user_id FROM user_tags WHERE tag_id = ANY($8::int[])
		))
	ORDER BY
		CASE WHEN $9 = 'age'      AND $10 = 'asc'  THEN sub.age END ASC NULLS LAST,
		CASE WHEN $9 = 'age'      AND $10 = 'desc' THEN sub.age END DESC NULLS LAST,
		CASE WHEN $9 = 'distance' AND $10 = 'asc'  THEN sub.distance END ASC NULLS LAST,
		CASE WHEN $9 = 'distance' AND $10 = 'desc' THEN sub.distance END DESC NULLS LAST,
		CASE WHEN $9 = 'elo'      AND $10 = 'asc'  THEN sub.elo END ASC NULLS LAST,
		CASE WHEN $9 = 'elo'      AND $10 = 'desc' THEN sub.elo END DESC NULLS LAST,
		CASE WHEN $9 = 'tags'     AND $10 = 'asc'  THEN sub.common_tags END ASC NULLS LAST,
		CASE WHEN $9 = 'tags'     AND $10 = 'desc' THEN sub.common_tags END DESC NULLS LAST,
		sub.id ASC
	LIMIT $2;
`
