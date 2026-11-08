# Task 2: To-Do List Web App (Vanilla JavaScript)

Web Development Internship, Elevate Labs.

A front-end only To-Do list where users can add, complete and remove tasks. Built with HTML, CSS and vanilla JavaScript, with no libraries or frameworks.

## Files
- `index.html`: input, Add button, filter buttons and list container
- `style.css`: layout and styling (responsive for phones)
- `script.js`: all app logic

## Features
- Add tasks with the Add button or the Enter key
- Empty input shows a message instead of adding a blank task
- Mark tasks complete or incomplete (checkbox or click the text, toggles a `completed` class)
- Remove any task with its Remove button
- Filter by All, Active or Completed
- Live counter of tasks left
- "Clear completed" button
- Tasks are saved in `localStorage`, so they survive a page refresh
- UI updates instantly, with no page reload

## Concepts practised
DOM selection and manipulation, event listeners, event delegation, `preventDefault()`, ES6 (`const`/`let`, arrow functions, template literals, array methods like `filter` and `find`), state-driven rendering

## How to run
1. Open the folder in VS Code
2. Right-click `index.html` and choose **Open with Live Server**
3. Add, complete and delete a few tasks to test

## Tools
VS Code, Chrome, Live Server extension
