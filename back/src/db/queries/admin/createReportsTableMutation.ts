export const createReportsTableMutation = `
	CREATE TABLE IF NOT EXISTS reports (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		target_id UUID NOT NULL,
		reason VARCHAR(500) NOT NULL,
		
		CONSTRAINT fk_reports_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_reports_target_id FOREIGN KEY(target_id) REFERENCES users(id) ON DELETE CASCADE
	);
	CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
	CREATE INDEX IF NOT EXISTS idx_reports_target_id ON reports(target_id);
`
