# Project1_Game

![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-34 Project 1 - Fangthar's Adevnture
For our first project, we were given a week to build an in-browser game using HTML, CSS and JavaScript. Fangthar's Adevnture is a tribute to the dungeon crawler RPG genre. I have always preferred playing RPG games, as they are great for escaping reality for a while! I decided to make a game based on games I have enjoyed playing growing up.

##### [Visit website](https://delve-deep.herokuapp.com/) for best playing experience (the game was not designed for mobile).
---
<!-- ## Setup instructions
- Clone or download the repo
- Install dependencies with `yarn install`
- Launch the app with `gulp` -->

---
# Overveiw of Fangthar's Adventure
<p align="center"><img src="https://i.imgur.com/FHrOnu5.png" width="700"></p>
###### The Game begins with an intro screen, which gives some flavour text to set scene and it doubles as instructions for the game too.
<p align="center"><img src="https://i.imgur.com/83AHsLb.png" width="700"></p>
###### Fangthar's Adevnture is set on a grid based level, hard coded into the JS file by myself. The player, monsters and items are set in place, coded into a set grid layout, allowing for more additions to the level in future.
<p align="center"><img src="https://i.imgur.com/XWk0iTP.png" width="700"></p>
###### As the game progresses the player will pickup health potions and weapons to become more powerful and stay alive. Choosing which monster to attack based on your remaining health and current attack power was the aim for all of these collective features.

<p align="center"><img src="https://i.imgur.com/ydSQ2Wf.png" width="700"></p>
 ###### Upon killing all of the monsters in the level I set an alert to appear, letting the player know that he/she has finished the game. I used some flavour text to try to keep the player immersed in the game.
<p align="center"><img src="https://i.imgur.com/hSgXi72.png" width="700"></p>
 Level two adds enemies to the map, as well as more items. This gives the player a first experience of combat within the game. The map size is increased as well.
<p align="center"><img src="https://i.imgur.com/Ydcw1zZ.png" width="700"></p>

---
 The Win Logic requires the player to reach the final door without being reduced to 0 hitpoints on the way.
 The players score is calculated using a formula that takes into account the time taken, steps taken, enemies killed and coins collected.
 Once the final level is beaten, the player is presented with their final score and can restart the entire game and try to beat it. The highscore is displayed above the game board.
---
# Planned Features
 I would like to find a way to procedurally generate maps. This was a goal of mine early during development that I had to abandon due to time constraints, but it is something I would love to revisit.
 Adding more enemy types and item definitions would be another great option.
 Finally I would like to improve on the design to make it fully scaleable to any screen size and to integrate the Arcade Machine Background into the game further.
---
# In Review
I am very pleased with the final product. While there are several small design changes I would like to make, I believe that I captured the feeling of Roguelike games quite well.
The game framework is robust and adding new item or enemy definitions is simply a matter of updating the definition list in the libraries.js file.
Similarly a new map can easily be created using the Map Maker on a blank new level.
