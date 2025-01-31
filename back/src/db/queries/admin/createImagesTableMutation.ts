export const createImagesTableMutation = `
	CREATE TABLE IF NOT EXISTS images (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		user_id UUID NOT NULL,
		name VARCHAR NOT NULL,
		CONSTRAINT fk_images_user FOREIGN KEY(user_id) REFERENCES users(id)
	);
`
