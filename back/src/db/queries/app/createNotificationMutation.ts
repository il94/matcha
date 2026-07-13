export const createNotificationMutation = `
	INSERT INTO notifications (user_id, sender_id, type)
	VALUES ($1, $2, $3)
	ON CONFLICT (user_id, sender_id, type)
	DO UPDATE SET created_at = CURRENT_TIMESTAMP, read = FALSE;
`
