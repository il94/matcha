export const getUserChatQuery = `
	SELECT
		chats.id,
		users.first_name AS title,
		images.name AS avatar,
		(SELECT JSON_BUILD_OBJECT('content', messages.content, 'createdAt', messages.created_at) FROM messages WHERE messages.chat_id = chats.id ORDER BY messages.created_at DESC LIMIT 1) AS last_message
	FROM chats
	LEFT JOIN users ON users.id = user_id_1 OR users.id = user_id_2 AND users.id != $1
	LEFT JOIN images ON users.id = images.user_id AND images.is_principal = true
	WHERE chats.id = $2;
`
