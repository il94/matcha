export const createSexualOrientationEnumMutation = `
	DO $$ 
	BEGIN
		IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sexual_orientation') THEN
			CREATE TYPE sexual_orientation AS ENUM ('Straight', 'Gay', 'Other');
		END IF;
	END $$;
`
