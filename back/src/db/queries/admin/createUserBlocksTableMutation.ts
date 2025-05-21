export const createUserBlocksTableMutation = `
	CREATE TABLE IF NOT EXISTS user_blocks (
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id_1 UUID NOT NULL,
		user_id_2 UUID NOT NULL,

		PRIMARY KEY (user_id_1, user_id_2),
		CONSTRAINT fk_user_blocks_user_id_1 FOREIGN KEY(user_id_1) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_user_blocks_user_id_2 FOREIGN KEY(user_id_2) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT no_self_block CHECK (user_id_1 <> user_id_2)
	);

	CREATE UNIQUE INDEX IF NOT EXISTS unique_user_blocks_pair
		ON user_blocks (
			LEAST(user_id_1, user_id_2),
			GREATEST(user_id_1, user_id_2)
		);
	CREATE INDEX IF NOT EXISTS idx_user_blocks_user_id_1 ON user_blocks(user_id_1);
	CREATE INDEX IF NOT EXISTS idx_user_blocks_user_id_2 ON user_blocks(user_id_2);
`
