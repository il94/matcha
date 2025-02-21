export const createGenderEnumMutation = `
	DO $$ 
	BEGIN
		IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
			CREATE TYPE gender AS ENUM ('Male', 'Female', 'Other');
		END IF;
	END $$;
`
