export const updateUserTagsMutation = `
	INSERT INTO user_tags (
		user_id,
		tag_id
	)
	SELECT $1, unnest($2::int[]);
`
