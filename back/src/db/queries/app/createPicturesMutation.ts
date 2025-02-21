export const createPicturesMutation = `
	WITH indexed_pictures AS (
		SELECT unnest($2::text[]) AS name,
			ROW_NUMBER() OVER () AS row_num
	)
	INSERT INTO pictures (user_id, name, is_principal)
	SELECT $1, name, (row_num = 1)
	FROM indexed_pictures;
`
