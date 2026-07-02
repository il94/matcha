export const createViewsTableMutation = `
	CREATE TABLE IF NOT EXISTS views (
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		target_id UUID NOT NULL,

		PRIMARY KEY (user_id, target_id),
		CONSTRAINT fk_views_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_views_target_id FOREIGN KEY(target_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT no_self_view CHECK (user_id <> target_id)
	);
	CREATE INDEX IF NOT EXISTS idx_views_user_id ON views(user_id);
	CREATE INDEX IF NOT EXISTS idx_views_target_id ON views(target_id);
`
