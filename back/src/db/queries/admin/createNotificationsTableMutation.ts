export const createNotificationsTableMutation = `
	CREATE TABLE IF NOT EXISTS notifications (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		sender_id UUID NOT NULL,
		type TEXT NOT NULL CHECK (type IN ('like', 'match', 'view', 'unlike', 'message')),
		read BOOLEAN DEFAULT FALSE NOT NULL,

		CONSTRAINT fk_notifications_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_notifications_sender_id FOREIGN KEY(sender_id) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT no_self_notification CHECK (user_id <> sender_id),
		CONSTRAINT unique_notification UNIQUE (user_id, sender_id, type)
	);
	CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
`
