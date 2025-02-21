export const createUserTagsTableMutation = `
	CREATE TABLE IF NOT EXISTS user_tags (
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		tag_id SERIAL NOT NULL,
		
		PRIMARY KEY (user_id, tag_id),
		CONSTRAINT fk_user_tags_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_user_tags_tag_id FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE
	);

	CREATE INDEX IF NOT EXISTS idx_user_tags_user_id ON user_tags(user_id);
	CREATE INDEX IF NOT EXISTS idx_user_tags_tag_id ON user_tags(tag_id);
`
