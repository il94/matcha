export const createTagMutation = `
	INSERT INTO tags (
		name
	) VALUES ($1);
`