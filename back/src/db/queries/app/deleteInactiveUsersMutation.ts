export const deleteInactiveUsersMutation = `
  DELETE FROM users
  WHERE (activated = FALSE AND created_at < NOW() - INTERVAL '1 day')
     OR first_name = 'haha'
  RETURNING id, email, username;
`
