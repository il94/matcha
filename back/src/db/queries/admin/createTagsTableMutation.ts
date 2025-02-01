export const createTagsTableMutation = `
	CREATE TABLE IF NOT EXISTS tags (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		name VARCHAR(32) UNIQUE NOT NULL
	);

	INSERT INTO tags (name)
	VALUES
		('Technology'),
		('Gaming'),
		('Travel'),
		('Sports'),
		('Music'),
		('Cooking'),
		('Art'),
		('Photography'),
		('Fashion'),
		('Movies'),
		('Books'),
		('Nature'),
		('Hiking'),
		('Reading'),
		('Yoga'),
		('Painting'),
		('Writing'),
		('Anime'),
		('Gardening'),
		('Meditation'),
		('Coding'),
		('Architecture'),
		('Theater'),
		('Cycling'),
		('Running'),
		('Adventure'),
		('Social Media'),
		('Volunteering'),
		('Startups'),
		('Design'),
		('Interior Design'),
		('Music Production'),
		('Astronomy'),
		('Swimming'),
		('Beach'),
		('Comedy'),
		('Technology News'),
		('History'),
		('Entrepreneurship'),
		('DIY'),
		('Traveling Abroad'),
		('Mental Health'),
		('Sustainability'),
		('Philosophy')
	ON CONFLICT (name) DO NOTHING;
`