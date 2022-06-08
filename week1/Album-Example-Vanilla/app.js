const CONTAINER = document.querySelector("#album-list");
let albums = [
    {title: "In Rainbows", artist: "Radiohead"},
    {title: "Pale Communion", artist: "Opeth"},
    {title: "Marked For Death", artist: "Emma Ruth Rundle"},
    {title: "Deadwing", artist: "Porcupine Tree"}
]
albums.forEach((Album, Index) => {
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerHTML = Album.title;
    
    titleDiv.onclick = function () {
        document.querySelector("#artist-"+Index).style.display = "";
        albums.forEach((album, index) => {
            if (index != Index) {
                document.querySelector("#artist-"+index).style.display = "none";
            }
        });
    }

    let artistDiv = document.createElement("div");
    artistDiv.classList.add("artist");
    artistDiv.id = "artist-"+Index;
    artistDiv.style.display = "none";
    artistDiv.innerHTML = Album.artist;

    let albumDiv = document.createElement("div");
    albumDiv.appendChild(titleDiv);
    albumDiv.appendChild(artistDiv);

    CONTAINER.appendChild(albumDiv);
});