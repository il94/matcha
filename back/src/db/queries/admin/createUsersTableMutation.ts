export const createUsersTableMutation = `
	CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		session_id VARCHAR,
		
		password VARCHAR(128) NOT NULL,
		first_name VARCHAR(64) NOT NULL,
		last_name VARCHAR(64) NOT NULL,
		username VARCHAR(32) NOT NULL UNIQUE,
		email VARCHAR(256) NOT NULL UNIQUE,
		
		birth_date VARCHAR,
		sexual_orientation VARCHAR,
		gender VARCHAR,
		bio TEXT,
		elo SMALLINT DEFAULT 0 NOT NULL CHECK (elo >= 0 AND elo <= 1000),
		views SMALLINT DEFAULT 0 NOT NULL CHECK (views >= 0),
		matchs SMALLINT DEFAULT 0 NOT NULL CHECK (views >= 0),
		dates SMALLINT DEFAULT 0 NOT NULL CHECK (views >= 0)
	);
`
