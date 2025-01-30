export const getUsersQuery = `
	SELECT users.*, JSON_AGG(images.name) AS image_names FROM users
	LEFT JOIN images ON images.user_id = users.id
	GROUP BY users.id
`
