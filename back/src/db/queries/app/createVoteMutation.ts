export const createVoteMutation = `
	INSERT INTO votes (user_id, target_id, liked)
	VALUES ($1, $2, $3)
	ON CONFLICT (user_id, target_id) DO UPDATE SET liked = EXCLUDED.liked, created_at = CURRENT_TIMESTAMP;
`
