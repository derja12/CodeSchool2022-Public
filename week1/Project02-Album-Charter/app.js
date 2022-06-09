const URL = "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=";
var app = new Vue({
    el: "#app",
    data: {
        searchInput: "",
        searchAlbums: [],

        pickedAlbums: [],

        heldAlbum: -1
    },
    methods: {
        fetchAlbumsBySearch: function () {
            // use searchInput to find albums w/ API
            fetch(URL + encodeURIComponent(this.searchInput)).then(response => {
                response.json().then(parsed_response => {
                    if (parsed_response.album != null) {
                        this.searchAlbums = parsed_response.album;
                    } else {
                        this.searchAlbums = [];
                    }
                });
            });
        },

        pickAlbum: function (index) {
            this.pickedAlbums.push(this.searchAlbums[index])
        },
        
        getPlaceholderClass: function (index) {
            if (index < 10) {
                return "top-10";
            } else if (index < 22) {
                return "top-22";
            } else {
                return "top-42";
            }
        },
        
        removeAlbum: function (index) {
            this.pickedAlbums.splice(index, 1);
        },
        
        pickupAlbum: function (index) {
            // Record which album the user picked up
            this.heldAlbum = index;
        },
        
        hoverAlbum: function (index) {
            // Display what the chart WOULD look like
            // Store actual chart in a temp so it isn't forgotten
        },

        dropAlbum: function (index) {
            // If the user is 'holding' an album, update the chart to where they dropped it
            if (this.heldAlbum < 0) { return; }
            
            let insertAlbum = this.pickedAlbums[this.heldAlbum];
            if (index >= this.pickedAlbums.length) { index = this.pickedAlbums.length - 1; }

            this.pickedAlbums.splice(this.heldAlbum, 1);
            this.pickedAlbums.splice(index, 0, insertAlbum);
            this.heldAlbum = -1;
        }
    },
    created: function () {
        console.log("Hello, Album Charter!");
    }
});