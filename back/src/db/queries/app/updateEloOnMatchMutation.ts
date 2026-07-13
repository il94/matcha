export const updateEloOnMatchMutation = `
	UPDATE users AS u
	SET elo = LEAST(1000, GREATEST(0, round(
		u.elo
		+ $3 * (1.0 / (1 + power(10, (u.elo - other.elo) / 400.0)))
	)))::int
	FROM users AS other
	WHERE (u.id = $1 AND other.id = $2)
	   OR (u.id = $2 AND other.id = $1);
`
