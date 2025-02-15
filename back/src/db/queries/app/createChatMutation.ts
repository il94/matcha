export const createChatMutation = `
	INSERT INTO chats (
		user_id_1,
		user_id_2
	) VALUES ($1, $2) RETURNING *;
`
