<div align="center">
	<img src="other/readme_images/main.gif">
</div>

<h1 align="center">
	Link
</h1>
<p align="center">
	https://matcha.ilandols.com
</p>


## Description
<p align="center">
	Steep. Sip. Match. <br>
	This project, matcha, is a dating web app completed on my own as part of the 42 School curriculum. It covers the whole journey, from signing up to the final encounter : completing a profile, browsing suggestions, expressing interest, and chatting with the ones who felt the same. <br>
	Everything is handmade : no ORM, no validation library, no user account manager. Raw SQL on PostgreSQL, home-made authentication, and real-time features over WebSocket.
</p>

<p align="center">
	<b>Back</b> · Node · TypeScript · Fastify · PostgreSQL · Redis · WebSocket · AWS S3 · Nodemailer <br>
	<b>Front</b> · React · TypeScript · Vite · Tailwind · shadcn/ui · React Query <br>
	<b>Infra</b> · Docker Compose
</p>



## Local installation

- Step 1 : Install and run Docker [Documentation](https://docs.docker.com/engine/install/)

- Step 2 : Clone the project and replace the two ".env.example" file extensions with ".env". You can find them located in the "front" and "back" folders. Variables are already filled, but it's recommended to replace them with your own values. The mailer and AWS S3 credentials are the only ones you really have to provide, as they are needed to send emails and to store the pictures.

- Step 3 : On a terminal, go to the project folder and execute :
```bash
docker compose up --build
```

<p align="center">
	After building, your app will be running on the URL specified in the front .env file (localhost:5173 by default). The database is created and seeded on the first run with more than 500 distinct profiles, so the app is usable right away.
</p>
<div align="center">
	<img src="other/readme_images/home.png">
</div>


# Features

## Authentication
<div align="center">
	<img src="other/readme_images/register.png" width="400">
	<img src="other/readme_images/complete.png" width="400">
</div>

<p align="center">
	Signing up requires an email address, a username, a first and last name, and a strong password, commonly used english words being refused thanks to a 25 000 words blacklist. A unique link is then sent by email to verify the account, and no session can be opened before that. A forgotten password is reset through a time limited link, with an answer that stays the same whether the email exists or not, and logging out takes a single click from any page of the site. <br>
	Once connected, a guided flow completes the profile with everything the matching needs : gender, sexual preferences, a biography, interests picked from reusable tags, and up to 5 pictures including a profile one. All of it stays editable at any time, a change of email triggering a new verification link.
</p>

## Location and privacy
<div align="center">
	<img src="other/readme_images/location.png" width="400">
	<img src="other/readme_images/settings.png" width="400">
</div>

<p align="center">
	Matching needs a location, so the app asks for the GPS one, down to the neighbourhood, behind an explicit consent step. Nothing is read from the browser before that button is pressed. If the tracking is declined, a manual city search takes over and becomes mandatory to use the matching features. The location remains editable from the profile at any time.
</p>

## Suggestions
<div align="center">
	<img src="other/readme_images/swipe.gif">
</div>

<p align="center">
	The home page is a deck of suggested profiles, built to be relevant rather than random. Suggestions respect the sexual orientation in both directions, a straight woman only sees men, bisexuality is handled, and an unspecified orientation is treated as bisexual by default. Blocked users are excluded, and so are the profiles already voted on. <br>
	The remaining profiles are ranked by a weighted score combining geographic proximity, which carries the strongest weight so that the same area comes first, the number of shared interest tags, and the popularity rating. On top of that ranking, the deck can be sorted and filtered by age, distance, popularity and common tags.
</p>

## Advanced search
<div align="center">
	<img src="other/readme_images/search.png" width="400">
	<img src="other/readme_images/filters.png" width="400">
</div>

<p align="center">
	The same panel doubles as an advanced search : combine an age range, a popularity range, a maximum distance and one or several interest tags, then sort the results by any of those criteria in both orders. Everything is resolved in a single handwritten SQL query.
</p>

## Popularity rating
<div align="center">
	<img src="other/readme_images/elo.png" width="400">
</div>

<p align="center">
	Every profile carries a public popularity rating, implemented as an Elo score between 0 and 1000, starting at 300. A like raises it, a dislike lowers it, and a match raises both profiles, but never by a flat amount : the weight of a vote depends on the rating of the voter. A star liking a small profile boosts it a lot, while the opposite barely moves. Dislikes follow a bell curve of proximity, maximal between peers and close to zero when the gap grows, so a star cannot destroy a small profile and a small profile cannot dent a star. <br>
	The full formulas are documented in <a href="ELO.md">ELO.md</a>.
</p>

## Profile consultation, likes and matches
<div align="center">
	<img src="other/readme_images/preview.png" width="400">
	<img src="other/readme_images/likes.png" width="400">
</div>

<p align="center">
	Visiting a profile shows everything about it except the email and the password, and the visit is recorded in the visit history of the person you looked at. From there you can see the popularity rating, whether the user is currently online, and if not, the date and time of their last connection. <br>
	Liking the profile picture expresses your interest, and requires having a profile picture yourself. When the feeling is mutual you become connected and a chat is opened. The page always states clearly whether you liked the profile and whether you are connected, and lets you take the like back, which closes the chat and stops any further notification. Users can also be reported as fake accounts, or blocked, a blocked user disappearing from the suggestions, the notifications and the chat. <br>
	On your side, your own profile keeps the two histories of who visited you and who liked you.
</p>

## Chat and notifications
<div align="center">
	<img src="other/readme_images/chat.png" width="400">
	<img src="other/readme_images/notifications.png" width="400">
</div>

<p align="center">
	Matching is fun, but talking is better, so a real-time chat opens with every connection. Messages travel over a native WebSocket, well under the 10 seconds required, and a toast warns you of a new message from any page of the site. <br>
	The same channel carries the notifications : a like received, a profile view, a message, a like given back, and a connected user taking their like away. A bell badge shows the unread ones from anywhere on the site.
</p>

## Security
<p align="center">
	Security is not a feature here, it's a requirement, so the whole site is built around it. Passwords are hashed with bcrypt and never stored in clear. Every SQL query is parameterized, no user input ever reaches a query string. React escapes the rendering, and every route with an input validates it against a JSON Schema that refuses any unexpected property. <br>
	Uploads are checked twice, on their declared mimetype and on their real content, then stored on S3 under random names behind short-lived signed URLs. Sessions live in Redis behind an httpOnly cookie, sensitive routes are rate limited, and all the credentials stay in .env files excluded from Git.
</p>

## More
<p align="center">
	The site is mobile-first, with a dedicated desktop layout, a light and a dark theme, and a demo account available from the login page so anyone can look around without signing up.
</p>
