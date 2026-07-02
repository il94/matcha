export const createViewMutation = `
	INSERT INTO views (user_id, target_id)
	VALUES ($1, $2)
	ON CONFLICT (user_id, target_id) DO UPDATE SET created_at = CURRENT_TIMESTAMP;
`
