---
title: 2021 Code Camp
slug: 2021-code-camp
date: April 13, 2021
img: graphicc.png
categories:
  - Portfolio
  - Frontend
  - Hackathon
---

The Digital Women club at Iowa State University hosted a 24-hour virtual hackathon event on April 9th-10th, 2021. My team members consisted of [Carter Moseley](http://cartermoseley.com), [Carter Brimeyer](https://github.com/carterbrimeyer), and [Kobe Hass](https://github.com/kjhass). At the time, we were all ISU sophomores studying Computer Science.

<!--more-->

Prior to the event, none of us had been to a hackathon, so it was a completely new experience, but we all had a great time learning and working on a project together.

### Languages, Tools, and Frameworks used

|  *Frontend*  |  *Backend*  |
| ------------ | ----------- |
| HTML/CSS     | Java        |
| Bootstrap    | Spring Boot |
| JavaScript   | MySQL       |


# The Project

With four people, a 24-hour time limit, and only my Raspberry Pi 3B+ as our source of quick hosting, our group decided to create a web application that serves as a graphing calculator, titled Graphicc. Having a backend is not necessary for an app as such; however, we wanted to have a full-stack application. With the app being full-stack, rather than just a website with some JavaScript, everyone had plenty to do in the 24-hours.

![Graphicc UI Demo](/blog-images/graphicc-demo.gif)

I spent most of my time on the frontend, utilizing Bootstrap to create a responsive design. I also worked with [Carter Brimeyer](https://github.com/carterbrimeyer) to implement drawing the graph on the HTML Canvas and how requests were sent to the backend. 

### How it all works
1. The frontend sends the input equation to the backend (Spring) server through a fetch request.
2. The backend receives the request and either
   1. Computes and stores the equation in the database; or
   2. Retrieves the points from the database if it has already calculated them.
3. The backend sends the points to the frontend.
4. The frontend plots the points.

---

#### "Best Software Hack"

<iframe src="https://www.youtube.com/embed/ttsXtyY5Vso" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed"></iframe>

This video was our team’s original submission, which won us the “Best Software Hack” at the event.

View the GitHub repository for Graphicc [here](https://github.com/ChristianLisle/graphicc).