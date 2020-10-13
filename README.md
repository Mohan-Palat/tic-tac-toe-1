# Tic Tac Toe

## Overview:

This web application is a rendition of tic-tac-toe utilizing colored blocks to represent player spaces. It was built to complete a milestone project for General Assembly's SEI program, demonstrating the reinforcement of my studies of web development. 


(./img/screenshot.png)
---

## Big Goals

- **Build a web application from scratch**, without a starter codebase
- Use your programming skills to **work out the game logic for a simple game like Tic Tac Toe**
- **Separate HTML, CSS, and JavaScript files** in your application
- Build an application **to a specification that someone else gives you**
- **Build a dynamic game that allows two players to compete** from the same computer
- **Craft a `README.md` file that explains your app** to the world

---

## Technical Requirements

Your Tic Tac Toe app must:
- **Render a game board in the browser**
- **Switch turns** between X and O (or whichever markers you select)
- **Visually display which side won** if a player gets three in a row, or show a draw if neither player wins
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **JavaScript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
  - You can use [GitHub Pages](https://pages.github.com/) for deploying your project
- Use **semantic markup** for HTML and CSS (adhere to best practices)
- Have well-formatted, and well-commented code

### User Stories

- As a user, I should be able to start a new tic tac toe game
- As a user, I should be able to click on a square to add X first and then O, and so on
- As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
- As a user, I should not be able to click the same square twice
- As a user, I should be shown a message when I win, lose or tie
- As a user, I should not be able to continue playing once I win, lose, or tie
- As a user, I should be able to play the game again without refreshing the page

#### Potential Extra Tic Tac Toe Features

- Keep track of multiple game rounds with a win, lose and tie counter
- Allow players to customize their tokens (X, O, name, picture, etc)
- Use [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to persist data locally to allow games to continue after page refresh or loss of internet connectivity
- Involve Audio in your game
- Create an AI opponent: teach JavaScript to play an unbeatable game against you
- Make your site fully responsive so that it is playable from a mobile phone
- Get inventive with your styling e.g. use hover effects or animations

#### Super Potential Extra Tic Tac Toe Features

- Allow 2 players to play online with each other using any means such as WebSockets, Firebase, or other 3rd-party services.

### README Suggestions

- List technologies used
- Link to wireframes and user stories.
- Document your planning and tell a story about your development process and problem-solving strategy.
- List unsolved problems which would be fixed in future iterations.
- Describe how you solved for the winner
- Describe how some of your favorite functions work

## Submission

**_DO NOT FORK THIS REPOSITORY!_** Create a **new** repository on your personal GitHub account. Then, submit your project as an issue to this repo:

👉 [Submit Issue Here](https://git.generalassemb.ly/prudential-0921/project-1/issues)

You must turn in something before presentations begin. However, you're welcome to continue working on it over the course of SEI and beyond!

With your submission please include any questions you'd like answered, or specific things on which you'd like us to focus when giving feedback.

### Necessary Deliverables

- A **working game, built by you**, hosted somewhere on the internet
- A **link to your hosted working game** in the URL section of your Github repository
- A **git repository hosted on Github**, with a link to your hosted game, and frequent commits dating back to the _very beginning of the project_
- A `README.md` file, including
  - Explanations of the technologies used, the approach taken, installation
    instructions, unsolved problems, etc.
  - [Follow this mini-lesson on writing documentation](https://git.generalassemb.ly/dc-wdi-fundamentals/markdown-and-documentation)
    for your project
  - Sample project readmes:
    - https://github.com/lerwickbrianw/SEI-Project1-Simon
    - https://github.com/ctrevino-mx/trivia-game
    - https://github.com/reemharbi/BloodApp
    - https://github.com/AlkhaldiAzzam/Project1-Tic-Tac-Toe

The URL section of your Github repo:
![URL section](https://i.imgur.com/QQ7RsfR.gif)

### Asking For Help

During the week, you will be divided into 3 squads, each with an instructor. The purpose of this is to have your code and progress reviewed, to make sure you're on track to finish.

Unit projects are an opportunity for two things:

1. Working through problems on your own. This solidifies your knowledge and is crucial for mastering the skills we've covered.
1. Becoming an independent developer. Developers tend to coordinate in groups but contribute individually, so this mimics the real world.

> The purpose of this project is for you to show us and future employers what you're capable of, so we want as much of the project to be your own, independent work as possible.

## Suggested Ways to Get Started

[Create your bronze, silver, and gold plan.](https://git.generalassemb.ly/prudential-0921/bronze-silver-gold)

- **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually. Use whiteboards!
- **Use your Developer Tools** (`console.log`, inspector, `alert` statements, etc) to debug and solve problems
  - Some great tutorials for the Developer Tools can be found [here](https://developers.google.com/web/tools/chrome-devtools/)
- Work through the lessons in class, **ask questions and come to office hours** when you need to. Think about adding relevant code to your Tic Tac Toe game each day, instead of, you know... _procrastinating_.
- **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
- **Check out Tutorial and Documentation resources** at home to better understand what you’ll be getting into.
- **Don’t be afraid to write code that you know you will have to remove later.** Create temporary elements (buttons, links, etc) that trigger events if real data is not available. For example, if you’re trying to figure out how to change some text when the game is over but you haven’t solved the win/lose game logic, you can create a button to simulate that until then.

1.  Create a repository on github.com for your project
2.  Clone it to the projects folder on your computer
3.  Add an HTML, CSS, and JS file to the folder
4.  Connect the CSS and JS file to your HTML file and test that they all work
5.  Build the most basic version of your Tic Tac Toe board in HTML and CSS (very little styling, just a first version)
6.  Write the pseudocode for the Tic Tac Toe logic as comments in your JS file
7.  Choose the correct data type for how your Tic Tac Toe board should be represented in JS
8.  Deploy your application to GitHub pages

## Useful Resources

- **[MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** _(a great reference for all things Vanilla JavaScript)_
- **[DevDocs](https://devdocs.io/)**
- **[GitHub Pages](https://pages.github.com)** _(for hosting your game)_
- **[GitHub Markdown Tutorial](https://guides.github.com/features/mastering-markdown/)** _(for working with Markdown)_


## Evaluation

Your instructors will use this rubric to assess your project:

[Evaluation Rubric](evaluation.md)

## Presentations


We expect everyone to attend all presentations in their entirety and will
provide breaks between each session.

This means **no working on your code** while others are presenting. This is your
chance to ask others how they tackled their project.

You'll have 5 minutes each for your presentation. Here are some suggested talking points:


- What would you do differently?
- What are you most proud of?
- What would you do next?
- How did you plan your project?
- What did you learn?
- Q & A

## Plagiarism

Take a moment to re-familiarize yourself with the plagiarism policy,
specifically on using work you find online and on work you do with other
students.

We give assignments like this to give you the opportunity to review the material
in class in a practical manner. By building something using what you've learned
in class, you'll be reviewing the material and gaining a deeper understanding of
it.

These assignments are similar to those you can expect when applying for a job,
either in the form of a take-home coding challenge or an in-person technical
interview. So it's important that you put in your best effort now and challenge
yourself to do this assignment on your own.

If you are struggling with the material, that's alright! That's why you're here.
First, try reviewing the previous lessons and exercises. Go easy on yourself,
you're still learning! If you're still struggling after that, come to office
hours and ask an instructor for help. They're here to help you!

Don't copy and paste from another source or another student or the solution
branch. That's just going to put you at a disadvantage when you're interviewing
for a job.