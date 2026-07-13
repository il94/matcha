export const updateEloOnVoteMutation = `
	UPDATE users AS target
	SET elo = LEAST(1000, GREATEST(0, round(
		target.elo
		+ 20 * (liker.elo / 1000.0)
		* CASE
			WHEN $3::int = 1 THEN
				(1.0 / (1 + power(10, (target.elo - liker.elo) / 400.0)))
			ELSE
				-4.0
				* (1.0 / (1 + power(10, (target.elo - liker.elo) / 400.0)))
				* (1.0 - 1.0 / (1 + power(10, (target.elo - liker.elo) / 400.0)))
		END
	)))::int
	FROM users AS liker
	WHERE target.id = $1 AND liker.id = $2;
`
