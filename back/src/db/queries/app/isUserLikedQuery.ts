export const isUserLikedQuery = `
	SELECT 1
	FROM user_votes
	WHERE user_id = $2
		AND target_id = $1
		AND liked = true;
`
