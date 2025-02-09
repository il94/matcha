export const createUserTagMutation = `
	INSERT INTO user_tags (
		user_id,
		tag_id
	) VALUES ($1, $2)
`
