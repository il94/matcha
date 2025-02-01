export const createUserTagsTableMutation = `
	CREATE TABLE IF NOT EXISTS user_tags (
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		tag_id UUID NOT NULL,
		PRIMARY KEY (user_id, tag_id),
		CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
		CONSTRAINT fk_tag FOREIGN KEY(tag_id) REFERENCES tags(id)
	);

	CREATE INDEX IF NOT EXISTS idx_user_tags_user ON user_tags(user_id);
	CREATE INDEX IF NOT EXISTS idx_user_tags_tag ON user_tags(tag_id);
`