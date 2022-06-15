const URL = "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=";

var app = new Vue({
    el: "#app",
    data: {
        artistInput: "",
        searchAlbumList: [],

        // no longer use pickedAlbumList

        // display list is what the user sees, not what gets edited. 
            // a function updates this to match the actual list
        displayList: [], 
        
        // actual list is what gets edited
        actualList: [],

        pickedUpAlbum: null,
        pickedUpIndex: -1,
    },
    methods: {
        searchArtist: function () {
            // fetch albums based on artist search term
            fetch(URL + encodeURIComponent(this.artistInput)).then(response => {
                response.json().then(data => {
                    this.searchAlbumList = data.album;
                });
            });

            this.artistInput = "";
        },

        addAlbum: function (index) {
            let album = this.searchAlbumList[index];
            this.actualList.push(album);
            this.matchDisplayToActual();
        },

        removeAlbum: function (index) {
            this.actualList.splice(index, 1);
            this.matchDisplayToActual();
        },
        
        pickupAlbum: function (index) {
            this.pickedUpAlbum = this.actualList[index];
            this.pickedUpIndex = index;
        },

        dropAlbum: function (drop_index) {
            if (this.pickedUpAlbum === null) { return; }
            
            if (drop_index >= this.actualList.length) {
                drop_index = this.actualList.length - 1;
            }

            // 1. delete the old album
            this.actualList.splice(this.pickedUpIndex, 1);
            // 2. insert the new album
            this.actualList.splice(drop_index, 0, this.pickedUpAlbum);
            // 3. clear picked up vars
            this.pickedUpAlbum = null;
            this.pickedUpIndex = -1;
            // 4. update the display list
            this.matchDisplayToActual();
        },
        hoverAlbum: function (hover_index) {
            if (this.pickedUpAlbum === null || this.pickedUpIndex === -1) { 
                // console.log("Hovered over with no current picked up album:", this.pickedUpAlbum, this.pickedUpIndex);
                return; 
            }

            if (this.tempList == []) {
                // console.log("Hovered with an empty tempList");
                return;
            }
            
            if (hover_index >= this.displayList.length) {
                hover_index = this.displayList.length - 1;
            }

            // 1. reset display to original list
            this.matchDisplayToActual();
            // 2. delete the old album from DISPLAY list
            this.displayList.splice(this.pickedUpIndex, 1);
            // 3. insert the new album into DISPLAY list
            this.displayList.splice(hover_index, 0, this.pickedUpAlbum);
        },
        isStillHoldingAlbum: function (event) {
            // if event.buttons == 0, the user is no longer holding their mouse down
            if (event.buttons == 0) {
                this.pickedUpAlbum = null;
                this.pickedUpIndex = -1;
                this.matchDisplayToActual();
            }
        },
        // update the display to show what the actual list is
        matchDisplayToActual: function () {
            this.displayList = [...this.actualList];
        }
    }
});

// TODO
// [x] Red CSS outline
// [x] List on the right side displaying album names
// [~] hover with temporary list showing