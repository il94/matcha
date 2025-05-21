export const createUserBlockMutation = `
	INSERT INTO user_blocks (user_id_1, user_id_2)
	VALUES (
		LEAST($1::UUID, $2::UUID),
		GREATEST($1::UUID, $2::UUID)
	);
`
