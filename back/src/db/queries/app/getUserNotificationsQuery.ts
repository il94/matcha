export const getUserNotificationsQuery = `
	SELECT
		notifications.id,
		notifications.type,
		notifications.read,
		notifications.created_at,
		JSONB_BUILD_OBJECT(
			'id', users.id,
			'username', users.username,
			'firstName', users.first_name,
			'avatar', (
				SELECT pictures.name
				FROM pictures
				WHERE pictures.user_id = users.id AND pictures.is_principal = TRUE
				LIMIT 1
			)
		) AS sender
	FROM notifications
	INNER JOIN users ON users.id = notifications.sender_id
	WHERE notifications.user_id = $1
	ORDER BY notifications.created_at DESC;
`
