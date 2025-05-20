export const createReportMutation = `
	INSERT INTO reports (user_id, target_id, reason)
	VALUES ($1, $2, $3);
`
