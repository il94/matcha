export const createMessagesTableMutation = `
	CREATE TABLE IF NOT EXISTS messages (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		chat_id UUID NOT NULL,
		author_id UUID NOT NULL,
		
		content TEXT NOT NULL,

		CONSTRAINT fk_messages_chat_id FOREIGN KEY(chat_id) REFERENCES chats(id) ON DELETE CASCADE,
		CONSTRAINT fk_messages_author_id FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE
	);

	CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
	CREATE INDEX IF NOT EXISTS idx_messages_author_id ON messages(author_id);
`
