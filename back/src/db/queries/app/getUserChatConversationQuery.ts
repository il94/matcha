export const getUserChatConversationQuery = `
	SELECT
		users.first_name AS title,
		pictures.name AS avatar,
		(
			SELECT JSON_AGG(
				JSON_BUILD_OBJECT(
					'createdAt', messages.created_at,
					'authorId', messages.author_id,
					'content', messages.content
				)
			)
			FROM messages
			WHERE messages.chat_id = chats.id
			GROUP BY messages.created_at
			ORDER BY messages.created_at ASC
			LIMIT 10
			
		) AS messages
	FROM chats
	LEFT JOIN users ON users.id = user_id_1 OR users.id = user_id_2 AND users.id != $1
	LEFT JOIN pictures ON users.id = pictures.user_id AND pictures.is_principal = true
	WHERE chats.id = $2;
`
