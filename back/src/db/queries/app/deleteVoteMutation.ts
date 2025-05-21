export const deleteVoteMutation = `
	DELETE FROM votes
	WHERE user_id = $1 AND target_id = $2
`
