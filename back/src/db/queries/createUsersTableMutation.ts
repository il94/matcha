export const createUsersTableMutation = `
	CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		first_name VARCHAR NOT NULL,
		last_name VARCHAR NOT NULL,
		user_name VARCHAR NOT NULL UNIQUE,
		email VARCHAR NOT NULL UNIQUE,
		birth_date VARCHAR NOT NULL,
		gender VARCHAR NOT NULL,
		sexualOrientation VARCHAR NOT NULL,

		bio TEXT,
		elo INT DEFAULT 0 NOT NULL,
		views INT DEFAULT 0 NOT NULL,
		matchs INT DEFAULT 0 NOT NULL,
		dates INT DEFAULT 0 NOT NULL
	)
`
