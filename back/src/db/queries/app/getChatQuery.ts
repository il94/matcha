export const getChatQuery = `
	SELECT user_id_1, user_id_2
	FROM chats
	WHERE id = $1;
`
