export const createPicturesTableMutation = `
	CREATE TABLE IF NOT EXISTS pictures (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		
		name VARCHAR NOT NULL,
		is_principal BOOLEAN NOT NULL DEFAULT FALSE,
		
		CONSTRAINT fk_pictures_user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
	);
`
