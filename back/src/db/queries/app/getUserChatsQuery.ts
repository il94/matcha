export const getUserChatsQuery = `
	SELECT DISTINCT ON (id)
		chats.id,
		users.first_name AS title,
		pictures.name AS avatar,
		(SELECT JSON_BUILD_OBJECT('content', messages.content, 'createdAt', messages.created_at) FROM messages WHERE messages.chat_id = chats.id ORDER BY messages.created_at DESC LIMIT 1) AS last_message
	FROM chats
	LEFT JOIN users ON (users.id = user_id_1 AND users.id != $1) OR (users.id = user_id_2 AND users.id != $1)
	LEFT JOIN pictures ON users.id = pictures.user_id AND pictures.is_principal = true
	WHERE user_id_1 = $1 OR user_id_2 = $1;
`
