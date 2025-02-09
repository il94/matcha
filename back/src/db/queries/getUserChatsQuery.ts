export const getUserChatsQuery = `
	SELECT DISTINCT ON (id)
		chats.*,
		users.first_name AS title,
		images.name AS avatar,
		(SELECT messages.content FROM messages WHERE messages.chat_id = chats.id ORDER BY messages.created_at DESC LIMIT 1) AS last_message
	FROM chats
	LEFT JOIN users ON users.id = user_id_1 OR users.id = user_id_2 AND users.id != $1
	LEFT JOIN images ON users.id = images.user_id AND images.is_principal = true
	WHERE user_id_1 = $1 OR user_id_2 = $1;
`
