export const createUsersTableMutation = `
	CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		session_id VARCHAR,
		
		email VARCHAR(256) NOT NULL UNIQUE,
		username VARCHAR(32) NOT NULL UNIQUE,
		first_name VARCHAR(64) NOT NULL,
		last_name VARCHAR(64) NOT NULL,
		password VARCHAR(128) NOT NULL,
		
		birth_date VARCHAR DEFAULT NULL,
		gender gender DEFAULT NULL,
		sexual_orientation sexual_orientation DEFAULT NULL,
		bio VARCHAR(256) DEFAULT NULL,
		elo SMALLINT DEFAULT 0 NOT NULL CHECK (elo >= 0 AND elo <= 1000),

		is_online BOOLEAN DEFAULT FALSE NOT NULL,
		last_connexion TIMESTAMP,
		
		activated BOOLEAN DEFAULT FALSE NOT NULL,
		completed BOOLEAN DEFAULT FALSE NOT NULL
	);
`
