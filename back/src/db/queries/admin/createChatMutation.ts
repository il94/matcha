export const createChatMutation = `
	INSERT INTO chats (
		user_id_1,
		user_id_2
	) VALUES (
	 (SELECT id FROM users WHERE username = $1),
	 (SELECT id FROM users WHERE username = $2)
	)
	RETURNING *;
`
