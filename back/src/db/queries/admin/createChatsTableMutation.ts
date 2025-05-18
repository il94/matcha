export const createChatsTableMutation = `
	CREATE TABLE IF NOT EXISTS chats (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id_1 UUID NOT NULL,
		user_id_2 UUID NOT NULL,
		
		CONSTRAINT fk_chats_user_id_1 FOREIGN KEY(user_id_1) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT fk_chats_user_id_2 FOREIGN KEY(user_id_2) REFERENCES users(id) ON DELETE CASCADE,
		CONSTRAINT unique_chat_users UNIQUE (user_id_1, user_id_2),
		CONSTRAINT no_self_chat CHECK (user_id_1 <> user_id_2)
	);

	CREATE INDEX IF NOT EXISTS idx_chats_user_id_1 ON chats(user_id_1);
	CREATE INDEX IF NOT EXISTS idx_chats_user_id_2 ON chats(user_id_2);
`
