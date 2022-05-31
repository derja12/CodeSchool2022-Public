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