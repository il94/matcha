export const deleteInactiveUsersMutation = `
  DELETE FROM users
  WHERE activated = FALSE AND created_at < NOW() - INTERVAL '1 day'
  RETURNING id, email, username;
`
