<h1 align="center">
<br>
GWÜSST-Client
<br>
</h1>


## Introduction
How good do you and your peers know Switzerland's most famous landscapes? Would you be able to show your knowledge and win against your friends? Gwüsst is an exciting game that allows players to compete against each other in guessing a certain location from Switzerland's most famous landscapes, such as mountains or hills. This is the front-end component of our project. The bakc-end component can be found [here](https://github.com/sopra-fs24-group-46/server).

## Technologies
The front-end components of this project were written in TSX and JS, using scss as well for styling. Moreover, the React framework is used. Communication between the server and client is achieved through Axios.

## High Level Components
The [Client](https://github.com/sopra-fs24-group-46/client/tree/development/src) is the User Interface desgined to interact with the [Server](https://github.com/sopra-fs24-group-46/server). It displays all the needed Informations and provides pages to make the necessary calls to the server. The Client takes care of Input validation and automatically navigates through the views as the game progresses. More over it loads the Map from [MapBox](https://github.com/sopra-fs24-group-46/client/blob/development/src/components/game/Lobby.tsx) Api to visualize locations in a meaningful way. Further we used QRCode.React to create QR-codes in the [Lobby](https://github.com/sopra-fs24-group-46/client/blob/development/src/components/game/Lobby.tsx)

## Launch & Deployment

First install the node packages
```console
npm install
```

The following command runs the app in the dev mode.
```console
npm run dev
```
  
  Open http://localhost:3000 to view it in your browser.

  The webpage will reload if you make edits and save them.

Moreover, this command builds the app for dev to the build folder.

```console
npm run build
```
## Illustrations
<h3 align="center">
  <br>
  Home Page 
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/HomePage.png" width="500"></a>

</h3>
<h3 align="center">
    <br>
  Registration Page
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/RegisterPage.png" width="500"></a>

</h3>
<h3 align="center">
  <br>
  Profile Page  
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/ProfilePage.png" width="500"></a>

</h3>
<h3 align="center">
    <br>
  Creating/Setting a game.
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/SettingGame.png" width="500"></a>

</h3>
<h3 align="center">
    <br>
  Lobby of a game.
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/Lobby.png" width="500"></a>


</h3>
<h3 align="center">
  <br>
  Round announcement/Start of the game
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/RoundAnnouncement.png" width="500"></a>

</h3>
<h3 align="center">
  <br>
  Location display
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/LocationShowing.png" width="500"></a>

</h3>
<h3 align="center">
  <br>
  Current Leadearboard
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/CurrentLeaderboard.png" width="500"></a>

</h3>
<h3 align="center">
  <br>
  End Leadearboard/ End of the game
  <br>
  <br>
  <a href="https://github.com/sopra-fs24-group-46"><img src="/ReadMeScreenshots/EndLeaderboard.png" width="500"></a>

</h3>

## Roadmap
This sections outlines the top 3 future improvements (client sided) which we would suggest to implement when continuing this project: 

- Optimize the game for mobile users. At the moment the game is playable on mobile but the user experience is not optimal. Changes on the responsiveness of our design would improve the experience for mobile players.
- Dynamic approximation of the optimal zoom level based on the scattering of the guesses. This could improve the quality of the guess reveal view of the game.
- Optimize the descriptions of the features of the game and game settings. Describing each feature seperately and in a more user friendly way than with a single information page could improve the experience of the users of the game. 

## Authors and Acknowledgment


SoPra Group 46 2024 consists of [Serafin Schoch](https://github.com/S3r4f1n), [Dominic Häfliger](https://github.com/Dhaefli),
[Rolando Villaseñor](https://github.com/RoVi80), [Daniel Odhiambo](https://github.com/DarthDanAmesh), and [Leandra Häfeli](https://github.com/Laendi22). 

We would like to thank our teaching assistant [Cedric von Rauscher](https://github.com/cedric-vr) for his support throughout the semester. We also like to thank GeoAdmin for providing its API. This semester has been both intriguing and challenging, providing us with valuable opportunities for growth. We've acquired extensive knowledge, not only in coding but also in teamwork and project execution. We would like to as well thank the whole SoPra 2024 team for the effort, we appreciate the opportunity and the experience gained from this project.
## License

GNU GPLv3
