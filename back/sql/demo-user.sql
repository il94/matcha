-- =============================================================================
-- Compte de démonstration
-- =============================================================================
--
-- Ce compte n'est PAS créé par le pipeline de seed (`npm run seed`) : il est
-- inséré à la main via ce script. Le serveur ne le connaît que par son email,
-- via la variable d'environnement DEMO_USER_EMAIL (cf. back/.env).
--
-- Il est verrouillé en lecture seule côté back (cf. back/src/app/app.demo-guard.ts) :
-- seules les requêtes GET passent, plus DELETE /logout. Aucun état ne
-- s'accumule dessus, il n'y a donc rien à réinitialiser.
--
-- Exécution :
--   docker compose exec back npm run seed:demo
--
-- (le script npm se contente d'exécuter ce fichier, cf. back/src/seed.demo.ts ;
-- il reste jouable à la main : docker compose exec -T db psql -U postgres -d
-- postgres < back/sql/demo-user.sql)
--
-- Le script est idempotent : il peut être rejoué sans risque (ON CONFLICT sur
-- l'email, puis remplacement des photos et des tags).
--
-- Prérequis : le schéma doit exister (il est créé au démarrage du back, via
-- dbPlugin → initDb) et la table `tags` doit être peuplée.
--
-- Les conversations et les notifications (sections 4 à 6) s'appuient sur les
-- profils de personnages insérés par `npm run seed` : ils sont retrouvés par
-- (first_name, last_name), le pseudo n'étant pas déterministe (cf. makeUsername
-- dans back/src/admin/data/generateUsers.ts). Si le seed n'a pas été joué, ces
-- sections n'insèrent simplement rien et le compte reste utilisable.
--
-- -----------------------------------------------------------------------------
-- À ajuster avant exécution
-- -----------------------------------------------------------------------------
--
-- * l'email doit correspondre EXACTEMENT à DEMO_USER_EMAIL, sinon le compte est
--   traité comme un compte normal et n'est pas verrouillé ;
-- * le hash ci-dessous correspond au mot de passe « demo », celui affiché
--   par le badge démo côté front (VITE_DEMO_PASSWORD). Pour en utiliser un
--   autre, régénérer le hash avec :
--
--     docker compose exec back node -e "console.log(require('bcrypt').hashSync('<mot-de-passe>', 10))"
--
-- Deux flags sont critiques et leur oubli est SILENCIEUX :
--   * completed = TRUE  : sinon le login ouvre une session de complétion et le
--                         visiteur atterrit sur le formulaire de profil ;
--   * activated = TRUE  : sinon le cron `deleteInactiveUsers`
--                         (back/src/scheduler/scheduler.plugin.ts) supprime le
--                         compte au bout de 24 h, sans la moindre erreur.
--
-- location_source est mis à 'manual' pour que la position ne soit jamais
-- écrasée : le compte démo ne peut de toute façon pas émettre de mise à jour de
-- localisation (bloquée côté WebSocket).
-- =============================================================================

BEGIN;

-- 1. Le compte -----------------------------------------------------------------

INSERT INTO users (
	password,
	first_name,
	last_name,
	username,
	email,

	birth_date,
	sexual_orientation,
	gender,
	bio,
	elo,

	is_online,
	last_connexion,

	activated,
	completed,

	longitude,
	latitude,
	location_label,
	location_source
)
VALUES (
	'$2b$10$3qfccBHEUdFLyJ74rnHvq.JPx7cx0zyxNZJO/YzxdQVJH7BdDocoq', -- « demo »
	'Demo',
	'Demo',
	'demo',
	'demo@demo.com',

	'1996-05-14',
	'Straight',
	'Male',
	'Read-only demo account. Have a look around, browse the profiles, then create your own to get the full experience.',
	999,

	FALSE,
	CURRENT_TIMESTAMP,

	TRUE,
	TRUE,

	2.3522,
	48.8566,
	'Paris, Île-de-France, France',
	'manual'
)
ON CONFLICT (email) DO UPDATE SET
	password = EXCLUDED.password,
	first_name = EXCLUDED.first_name,
	last_name = EXCLUDED.last_name,
	bio = EXCLUDED.bio,
	activated = TRUE,
	completed = TRUE;

-- 2. La photo de profil ---------------------------------------------------------
--
-- Au moins une photo principale est obligatoire : sans elle, completed = TRUE
-- est incohérent avec le reste de l'app et le front n'a pas d'avatar à
-- afficher. Une URL externe convient (le compte dev utilise déjà une image
-- dicebear, cf. back/src/admin/data/generateUsers.ts).

DELETE FROM pictures
WHERE user_id = (SELECT id FROM users WHERE email = 'demo@demo.com');

INSERT INTO pictures (user_id, name, is_principal)
SELECT
	users.id,
	'https://api.dicebear.com/9.x/identicon/svg?seed=matcha-demo-account',
	TRUE
FROM users
WHERE users.email = 'demo@demo.com';

-- 3. Les centres d'intérêt ------------------------------------------------------

DELETE FROM user_tags
WHERE user_id = (SELECT id FROM users WHERE email = 'demo@demo.com');

INSERT INTO user_tags (user_id, tag_id)
SELECT users.id, tags.id
FROM users, tags
WHERE users.email = 'demo@demo.com'
	AND tags.name IN ('Travel', 'Music', 'Photography', 'Cooking', 'Movies');

-- 4. Les matchs -----------------------------------------------------------------
--
-- Une conversation n'existe normalement qu'entre deux profils qui se sont likés
-- mutuellement : les votes sont donc posés dans les deux sens pour que l'état
-- affiché (match, bouton « unlike », liste des likes) reste cohérent avec les
-- chats créés juste après.
--
-- Les six partenaires sont les mêmes dans toutes les sections qui suivent.

DELETE FROM votes
WHERE user_id = (SELECT id FROM users WHERE email = 'demo@demo.com')
	OR target_id = (SELECT id FROM users WHERE email = 'demo@demo.com');

INSERT INTO votes (user_id, target_id, liked, created_at)
SELECT
	demo.id,
	partner.id,
	TRUE,
	CURRENT_TIMESTAMP - p.age
FROM (VALUES
	('Marion', 'Cotillard', INTERVAL '12 days'),
	('Léna', 'Mahfouf', INTERVAL '9 days'),
	('Naomi', 'Campbell', INTERVAL '6 days'),
	('David', 'Bowie', INTERVAL '4 days'),
	('Light', 'Yagami', INTERVAL '2 days'),
	('Bruno', 'Mars', INTERVAL '20 hours')
) AS p(first_name, last_name, age)
JOIN users partner
	ON partner.first_name = p.first_name AND partner.last_name = p.last_name
CROSS JOIN (SELECT id FROM users WHERE email = 'demo@demo.com') AS demo
ON CONFLICT (user_id, target_id) DO NOTHING;

INSERT INTO votes (user_id, target_id, liked, created_at)
SELECT
	partner.id,
	demo.id,
	TRUE,
	CURRENT_TIMESTAMP - p.age
FROM (VALUES
	('Marion', 'Cotillard', INTERVAL '12 days'),
	('Léna', 'Mahfouf', INTERVAL '9 days'),
	('Naomi', 'Campbell', INTERVAL '6 days'),
	('David', 'Bowie', INTERVAL '4 days'),
	('Light', 'Yagami', INTERVAL '2 days'),
	('Bruno', 'Mars', INTERVAL '20 hours')
) AS p(first_name, last_name, age)
JOIN users partner
	ON partner.first_name = p.first_name AND partner.last_name = p.last_name
CROSS JOIN (SELECT id FROM users WHERE email = 'demo@demo.com') AS demo
ON CONFLICT (user_id, target_id) DO NOTHING;

-- 5. Les conversations ----------------------------------------------------------
--
-- Le compte étant en lecture seule, il ne peut ouvrir aucune discussion
-- lui-même : sans ces conversations pré-remplies, l'onglet Chat serait vide.
--
-- La suppression des chats du compte démo suffit à effacer les messages
-- (ON DELETE CASCADE sur messages.chat_id), ce qui rend la section rejouable.

DELETE FROM chats
WHERE user_id_1 = (SELECT id FROM users WHERE email = 'demo@demo.com')
	OR user_id_2 = (SELECT id FROM users WHERE email = 'demo@demo.com');

INSERT INTO chats (user_id_1, user_id_2, created_at)
SELECT
	demo.id,
	partner.id,
	CURRENT_TIMESTAMP - p.age
FROM (VALUES
	('Marion', 'Cotillard', INTERVAL '12 days'),
	('Léna', 'Mahfouf', INTERVAL '9 days'),
	('Naomi', 'Campbell', INTERVAL '6 days'),
	('David', 'Bowie', INTERVAL '4 days'),
	('Light', 'Yagami', INTERVAL '2 days'),
	('Bruno', 'Mars', INTERVAL '20 hours')
) AS p(first_name, last_name, age)
JOIN users partner
	ON partner.first_name = p.first_name AND partner.last_name = p.last_name
CROSS JOIN (SELECT id FROM users WHERE email = 'demo@demo.com') AS demo;

-- Les messages, dans l'ordre : `from_demo` indique l'auteur (TRUE = le compte
-- démo, FALSE = le personnage) et `age` l'ancienneté, qui doit décroître au fil
-- d'une même conversation — c'est elle qui donne l'ordre d'affichage et le
-- dernier message de l'aperçu dans la liste des chats.

INSERT INTO messages (chat_id, author_id, content, created_at)
SELECT
	chats.id,
	CASE WHEN m.from_demo THEN demo.id ELSE partner.id END,
	m.content,
	CURRENT_TIMESTAMP - m.age
FROM (VALUES
	-- Marion Cotillard (cinéma)
	('Marion', 'Cotillard', FALSE, 'Your profile says Movies. Dangerous, I might talk about it for hours.', INTERVAL '12 days'),
	('Marion', 'Cotillard', TRUE, 'That is exactly the risk I was hoping for.', INTERVAL '11 days 22 hours'),
	('Marion', 'Cotillard', FALSE, 'Good answer. Last film that really stayed with you?', INTERVAL '11 days 20 hours'),
	('Marion', 'Cotillard', TRUE, 'La Môme. I rewatched it last winter and it hit even harder.', INTERVAL '11 days 18 hours'),
	('Marion', 'Cotillard', FALSE, 'Now you are just being charming. It works, but I noticed.', INTERVAL '11 days 15 hours'),

	-- Léna Mahfouf (internet, mode)
	('Léna', 'Mahfouf', TRUE, 'Paris too? Your photos scream Paris.', INTERVAL '9 days'),
	('Léna', 'Mahfouf', FALSE, 'Guilty. Coffee somewhere in the 11th and I never leave the neighbourhood.', INTERVAL '8 days 21 hours'),
	('Léna', 'Mahfouf', TRUE, 'I know a place with terrible chairs and incredible coffee.', INTERVAL '8 days 20 hours'),
	('Léna', 'Mahfouf', FALSE, 'Sold. I will suffer for a good espresso.', INTERVAL '8 days 19 hours'),

	-- Naomi Campbell (art)
	('Naomi', 'Campbell', FALSE, 'Photography in your tags. Are you any good, or is it aspirational?', INTERVAL '6 days'),
	('Naomi', 'Campbell', TRUE, 'Aspirational, mostly. I own a very expensive lens cap.', INTERVAL '5 days 23 hours'),
	('Naomi', 'Campbell', FALSE, 'Honest. That is rarer here than talent.', INTERVAL '5 days 20 hours'),

	-- David Bowie (musique)
	('David', 'Bowie', TRUE, 'Okay, I have to ask: Berlin era or Ziggy era?', INTERVAL '4 days'),
	('David', 'Bowie', FALSE, 'Berlin. Ziggy was a costume, Berlin was the truth.', INTERVAL '3 days 22 hours'),
	('David', 'Bowie', TRUE, 'Correct answer. We can keep talking.', INTERVAL '3 days 21 hours'),
	('David', 'Bowie', FALSE, 'I will send you a playlist. Do not open it at work.', INTERVAL '3 days 18 hours'),

	-- Light Yagami (anime)
	('Light', 'Yagami', FALSE, 'You looked at my profile three times before matching. Interesting.', INTERVAL '2 days'),
	('Light', 'Yagami', TRUE, 'That is a slightly unsettling opener.', INTERVAL '1 day 22 hours'),
	('Light', 'Yagami', FALSE, 'I prefer thorough. Tell me about your Sunday routine.', INTERVAL '1 day 20 hours'),

	-- Bruno Mars (musique)
	('Bruno', 'Mars', FALSE, 'Cooking in your tags. What are you making me?', INTERVAL '20 hours'),
	('Bruno', 'Mars', TRUE, 'Pasta. Always pasta. I have exactly one signature dish.', INTERVAL '18 hours'),
	('Bruno', 'Mars', FALSE, 'One good dish beats ten bad ones. Friday?', INTERVAL '3 hours')
) AS m(first_name, last_name, from_demo, content, age)
JOIN users partner
	ON partner.first_name = m.first_name AND partner.last_name = m.last_name
CROSS JOIN (SELECT id FROM users WHERE email = 'demo@demo.com') AS demo
JOIN chats
	ON (chats.user_id_1 = demo.id AND chats.user_id_2 = partner.id)
	OR (chats.user_id_2 = demo.id AND chats.user_id_1 = partner.id);

-- 6. Les notifications ----------------------------------------------------------
--
-- La table porte une contrainte UNIQUE (user_id, sender_id, type) : un même
-- expéditeur ne peut donc pas apparaître deux fois pour le même type. Les
-- notifications du compte démo sont purgées d'abord, ce qui rend la section
-- rejouable ; `read = FALSE` laisse le badge « non lu » visible sur quelques
-- entrées.

DELETE FROM notifications
WHERE user_id = (SELECT id FROM users WHERE email = 'demo@demo.com')
	OR sender_id = (SELECT id FROM users WHERE email = 'demo@demo.com');

INSERT INTO notifications (user_id, sender_id, type, read, created_at)
SELECT
	demo.id,
	sender.id,
	n.type,
	n.read,
	CURRENT_TIMESTAMP - n.age
FROM (VALUES
	('Bruno', 'Mars', 'message', FALSE, INTERVAL '3 hours'),
	('Light', 'Yagami', 'view', FALSE, INTERVAL '10 hours'),
	('Bruno', 'Mars', 'match', FALSE, INTERVAL '20 hours'),
	('Light', 'Yagami', 'match', TRUE, INTERVAL '2 days'),
	('David', 'Bowie', 'like', TRUE, INTERVAL '4 days'),
	('Naomi', 'Campbell', 'view', TRUE, INTERVAL '6 days 2 hours'),
	('Naomi', 'Campbell', 'match', TRUE, INTERVAL '6 days'),
	('Léna', 'Mahfouf', 'match', TRUE, INTERVAL '9 days'),
	('Marion', 'Cotillard', 'match', TRUE, INTERVAL '12 days')
) AS n(first_name, last_name, type, read, age)
JOIN users sender
	ON sender.first_name = n.first_name AND sender.last_name = n.last_name
CROSS JOIN (SELECT id FROM users WHERE email = 'demo@demo.com') AS demo
ON CONFLICT (user_id, sender_id, type) DO NOTHING;

-- 7. Les visites ----------------------------------------------------------------
--
-- Une vingtaine de profils ayant consulté le compte démo, c'est-à-dire des
-- lignes `target_id = démo` : c'est le sens que lit l'onglet Visites
-- (cf. getUserViewsQuery, qui filtre sur target_id et trie par created_at
-- décroissant). L'inverse (les profils visités PAR le compte) n'est pas
-- alimenté : rien ne l'affiche côté front et le compte, en lecture seule, ne
-- peut de toute façon pas enregistrer de visite.
--
-- Les six partenaires de conversation en font partie, avec une visite
-- légèrement antérieure au premier message pour rester cohérente avec la
-- chronologie des sections 4 à 6, et avec les notifications de type `view` déjà
-- posées pour Naomi Campbell et Light Yagami.

DELETE FROM views
WHERE user_id = (SELECT id FROM users WHERE email = 'demo@demo.com')
	OR target_id = (SELECT id FROM users WHERE email = 'demo@demo.com');

INSERT INTO views (user_id, target_id, created_at)
SELECT
	visitor.id,
	demo.id,
	CURRENT_TIMESTAMP - v.age
FROM (VALUES
	-- Les profils avec qui une conversation est ouverte
	('Bruno', 'Mars', INTERVAL '21 hours'),
	('Light', 'Yagami', INTERVAL '10 hours'),
	('David', 'Bowie', INTERVAL '4 days 1 hour'),
	('Naomi', 'Campbell', INTERVAL '6 days 2 hours'),
	('Léna', 'Mahfouf', INTERVAL '9 days 2 hours'),
	('Marion', 'Cotillard', INTERVAL '12 days 3 hours'),

	-- Les visites sans suite
	('Zendaya', 'Coleman', INTERVAL '2 hours'),
	('Timothée', 'Chalamet', INTERVAL '7 hours'),
	('Billie', 'Eilish', INTERVAL '14 hours'),
	('Rihanna', 'Fenty', INTERVAL '1 day 3 hours'),
	('Keanu', 'Reeves', INTERVAL '1 day 18 hours'),
	('Dua', 'Lipa', INTERVAL '2 days 5 hours'),
	('Léa', 'Seydoux', INTERVAL '3 days 4 hours'),
	('Emma', 'Watson', INTERVAL '5 days 6 hours'),
	('Taylor', 'Swift', INTERVAL '7 days 8 hours'),
	('Serena', 'Williams', INTERVAL '8 days 12 hours'),
	('Natalie', 'Portman', INTERVAL '10 days 5 hours'),
	('Freddie', 'Mercury', INTERVAL '11 days 9 hours'),
	('Scarlett', 'Johansson', INTERVAL '13 days 7 hours'),
	('Adele', 'Adkins', INTERVAL '15 days 4 hours')
) AS v(first_name, last_name, age)
JOIN users visitor
	ON visitor.first_name = v.first_name AND visitor.last_name = v.last_name
CROSS JOIN (SELECT id FROM users WHERE email = 'demo@demo.com') AS demo
ON CONFLICT (user_id, target_id) DO NOTHING;

COMMIT;

-- Contrôle ---------------------------------------------------------------------
--
--   SELECT u.username, u.email, u.activated, u.completed,
--          (SELECT count(*) FROM pictures p WHERE p.user_id = u.id) AS pictures,
--          (SELECT count(*) FROM user_tags t WHERE t.user_id = u.id) AS tags,
--          (SELECT count(*) FROM chats c
--            WHERE c.user_id_1 = u.id OR c.user_id_2 = u.id) AS chats,
--          (SELECT count(*) FROM notifications n WHERE n.user_id = u.id) AS notifs,
--          (SELECT count(*) FROM views w WHERE w.target_id = u.id) AS views
--   FROM users u
--   WHERE u.email = 'demo@demo.com';
--
-- (chats = 6, notifs = 9 et views = 20 si `npm run seed` a bien été joué avant ;
-- 0 sinon, les personnages n'existant alors pas en base)
