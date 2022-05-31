# Day 1 Timeline

# Hour 1
## *--Vocabulary--*

Front-end:
<br> &emsp; Visible to the user of a device or service [0]

Back-end:
<br> &emsp; Any part of a website or software program that users do not see [1]

Framework:
<br> &emsp; Basic conceptional structure (as of ideas) [2]
<br> &emsp; Skeletal, openwork, or structural frame [2]

CS framework:
<br> &emsp; Software that are developed and used by developers to build applications. [3]

<br><br>

## *--Frameworks--*

*Using a software framework to develop applications **lets you focus on the high-level functionality** of the application. This is because any **low-level functionality is taken care of by the framework itself.*** [3]


Framework Examples:
<br> &emsp; React
<br> &emsp; Angular
<br> &emsp; NodeJS
<br> &emsp; EmberJS
<br> &emsp; etc.

<br><br>

## *--Why use vue?--*

Introduction to Vue.

Demos:
<br> &emsp; Color Click Racer (50 html / 100 js) 
<br> &emsp; &emsp; Website : https://derja12.github.io/Color-Click-Racer/
<br> &emsp; &emsp; Code : https://github.com/csse4200/s22-websocket-derja12/
<br> &emsp; JFA algorithm (40 html / 300 js)
<br> &emsp; &emsp; Website : https://derja12.github.io/JFA/
<br> &emsp; &emsp; Code : https://github.com/derja12/derja12.github.io/tree/master/JFA
<br> &emsp; Maze Game (40 html / 300 js)
<br> &emsp; &emsp; Website : N/A
<br> &emsp; &emsp; Code : N/A
<br> &emsp; Todo App (-- / --)
<br> &emsp; &emsp; Website : N/A
<br> &emsp; &emsp; Code : N/A

These things are SIMPLE! (compared to having to query the dom and do everything manually)
WE CAN WORK AT A HIGH LEVEL! Don't worry about low-level stuff.

## With Vue
### index.html
```html
<!DOCTYPE html5>
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <title>Album List</title>
    </head>
    <body>
        <div id="app">
            <div v-for="album in albums">
                <div class='title'>{{ album.title }}</div>
                <div class='artist'>{{ album.artist }}</div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```
### app.js
```js
var app = new Vue({
    el: '#app',
    data: {
        albums: [
            {title: "In Rainbows", artsit: "Radiohead"},
            {title: "Pale Communion", artsit: "Opeth"},
            {title: "Marked For Death", artsit: "Emma Ruth Rundle"},
            {title: "Deadwing", artist: "Porcupine Tree"}
        ]
    }
});
```
### style.css
```css
.title {
    font-size: 3rem;
    color: #111;
}
.artist {
    font-size: 2rem;
    color: #444;
}
```
<br><br>

## Plain Javascript
### index.html
```html
<!DOCTYPE html5>
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <title>Album List</title>
    </head>
    <body>
        <div id="album-list"></div>
        <script src="app.js"></script>
    </body>
</html>
```
### app.js
```js
const CONTAINER = document.querySelector("#album-list");
let albums = [
    {title: "In Rainbows", artist: "Radiohead"},
    {title: "Pale Communion", artist: "Opeth"},
    {title: "Marked For Death", artist: "Emma Ruth Rundle"},
    {title: "Deadwing", artist: "Porcupine Tree"}
]
for (i = 0; i < albums.length; i++) {
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerHTML = albums[i].title;

    let artistDiv = document.createElement("div");
    artistDiv.classList.add("artist");
    artistDiv.innerHTML = albums[i].artist;

    let albumDiv = document.createElement("div");
    albumDiv.appendChild(titleDiv);
    albumDiv.appendChild(artistDiv);

    CONTAINER.appendChild(albumDiv);
}
```
### style.css
```css
.title {
    font-size: 3rem;
    color: #111;
}
.artist {
    font-size: 2rem;
    color: #444;
}
```

<br><br>

# Hour 2

Project 1 - Magic 8-ball
<br> &emsp; Set up the 8-ball with Text/positioning and coloring (no vue yet)
<br> &emsp; SET UP VUE / Get some responses set up and askQuestion function
<br> &emsp; &emsp; DATA - ```responsePrompts, defaultPrompt, responseIndex, displayResponse```
<br> &emsp; &emsp; METHODS - ```askQuestion, updateDisplayResponse```
<br> &emsp; &emsp; CREATED - ```this.updateDisplayResponse();```

<br><br>

# Hour 3

Project 1 - Magic 8-ball
<br> &emsp; Set up question input
<br> &emsp; Set up reactive question feedback (```v-if's and v-else's```)

<br><br>

# Hour 4

Set up a github repository

Go Over Contact Information (email)

<br><br><br><br><br><br>

# Sources
0. https://www.merriam-webster.com/dictionary/front-end
1. https://techterms.com/definition/backend
2. https://www.merriam-webster.com/dictionary/framework
3. https://hackr.io/blog/what-is-frameworks