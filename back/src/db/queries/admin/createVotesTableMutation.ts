export const createVotesTableMutation = `
	CREATE TABLE IF NOT EXISTS votes (
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		target_id UUID NOT NULL,
		liked BOOLEAN NOT NULL,
		
		PRIMARY KEY (user_id, target_id),
		CONSTRAINT fk_votes_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_votes_target_id FOREIGN KEY(target_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT no_self_vote CHECK (user_id <> target_id)
	);
	CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
	CREATE INDEX IF NOT EXISTS idx_votes_target_id ON votes(target_id);
`
