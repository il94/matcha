export const createMessageMutation = `
	INSERT INTO messages (
		chat_id,
		author_id,
		content
	) VALUES ($1, $2, $3) RETURNING *;
`
