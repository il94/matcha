export const isUserBlockedQuery = `
	SELECT 1
	FROM user_blocks
	WHERE user_id_1 = LEAST($1::UUID, $2::UUID)
	  AND user_id_2 = GREATEST($1::UUID, $2::UUID)
	LIMIT 1;
`
