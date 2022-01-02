---
title: CyRun 🎮
slug: cyrun
date: November 30, 2020
img: cyrun.png
categories:
  - Portfolio
  - Frontend
---

CyRun is a multiplayer web-based game extremely similar to Pac-Man. Users can either play solo or with their friends. There will always be four players, where any remaining players will be CPUs. The game assigns three of the players as ghosts and one Pac-Man.

<!--more-->

The game mechanics are practically identical to that of Pac-Man, where ghosts try to collide with Pac-man to kill him. The three ghosts all have the same objective in mind, to kill Pac-Man as many times as possible while he tries to collect all dots and pills. The game finishes as soon as Pac-Man has consumed all of the dots and pills. Similar to regular Pac-Man, after Pac-Man consumes a pill, he is given ten seconds where he is immune to the ghosts, and eats them in the event of a collision. The winner of a game is determined at the end. Either Pac-Man or the three ghosts (together) can win. A demonstration of the gameplay and the scoring system is shown below.

### Tech Stack

  - Node JS
  - Socket.io
  - Express JS
  - Bootstrap

#### Gameplay Demo

![CyRun Gameplay](/blog-images/cyrun-gameplay.gif)

#### Scoring System

  - Pac-Man consumes dot or pill – 1 point
  - Pac-Man consumes Ghost – 2 points
  - Ghost kills Pac-Man – 15 points

[Click here](http://cyrun.christianlisle.com) to play CyRun.

---

Learn more about how CyRun was made in my [COM-S-319 blog post](/post/com-s-319).

View the GitHub repository for CyRun [here](https://github.com/ChristianLisle/cyrun).