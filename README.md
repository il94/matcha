<div align="center">
	<img src="other/readme_images/banner.gif">
</div>

<h1 align="center">
	Link
</h1>
<p align="center">
	https://matcha.ilandols.com/
</p>

## Description
<p align="center">
	Tired of swiping into the void ? Matcha suggests profiles that really match you, just a few meters away from your place.<br>This project has been completed as part of the 42 School curriculum.
</p>

## Local installation

- Step 1 : Install and run Docker [Documentation](https://docs.docker.com/engine/install/)

- Step 2 : Clone the project and rename the two ".env.example" files to ".env". You can find them located in the "back" and "front" folders. Most variables are already filled, but it's recommended to replace them with your own values. Be careful though with the back's `AWS_*` and `MAILER_*` variables : those ones are not provided, as they respectively require an S3 bucket (photo storage) and an SMTP account (sending the activation and password reset emails) that you'll have to get by yourself.

- Step 3 : On a terminal, go to the project folder and execute :
```bash
docker compose up --build
```

After building, your app will be running on localhost:5173.

- Step 4 (optional) : To avoid starting on an empty app, you can fill the database with a few hundred fake profiles :
```bash
docker compose exec back npm run seed:dev
```

# Features

## Matching
<div align="center">
	<img src="other/readme_images/swipes.gif">
</div>
<p align="center">
	Once your profile is created, discover a stack of profiles suggested just for you. The algorithm mixes your location, your common interests and the other's popularity to offer you the best matches first. Swipe right if you're interested, and cross your fingers for the match !
</p>

## Filtering
<table align="center">
	<tr>
		<td><img src="other/readme_images/filters.png" width="160"></td>
		<td width="480">Not convinced by the suggestions ? Take matters into your own hands with the advanced search, and filter profiles by age, distance, fame rating or common interests to find exactly what you're looking for.</td>
	</tr>
</table>

## Chat
<div align="center">
	<img src="other/readme_images/chat.gif">
</div>
<p align="center">
	It's a match ! Now you just have to break the ice. Each match unlocks a real time conversation, so you never miss an answer, wherever you are on the app.
</p>

## Fame rating
<table align="center">
	<tr>
		<td width="480">Every user has a fame rating, a score inspired by the Elo ranking, which goes up with each like and down with each dislike. The more popular you are, the higher you climb in the others' suggestions !</td>
		<td><img src="other/readme_images/profile.png" width="160"></td>
	</tr>
</table>
