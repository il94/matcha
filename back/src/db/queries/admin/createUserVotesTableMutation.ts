export const createUserVotesTableMutation = `
	CREATE TABLE IF NOT EXISTS user_votes (
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		target_id UUID NOT NULL,
		liked BOOLEAN NOT NULL,
		
		PRIMARY KEY (user_id, target_id),
		CONSTRAINT fk_user_votes_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_user_votes_target_id FOREIGN KEY(target_id) REFERENCES users(id) ON DELETE CASCADE
	);
	CREATE INDEX IF NOT EXISTS idx_user_votes_user_id ON user_votes(user_id);
	CREATE INDEX IF NOT EXISTS idx_user_votes_target_id ON user_votes(target_id);
`
