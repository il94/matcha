export const getChatMessagesQuery = `
	SELECT
		messages.*,
		images.name AS avatar
	FROM messages
	LEFT JOIN images ON images.user_id = messages.author_id AND images.is_principal = true 
	WHERE messages.chat_id = $1
	ORDER BY messages.created_at ASC
`
