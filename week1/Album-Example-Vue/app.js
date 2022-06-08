var app = new Vue({
    el: '#app',
    data: {
        albums: [
            {title: "In Rainbows", artist: "Radiohead"},
            {title: "Pale Communion", artist: "Opeth"},
            {title: "Marked For Death", artist: "Emma Ruth Rundle"},
            {title: "Deadwing", artist: "Porcupine Tree"}
        ],
        selectedIndex: -1
    },
    methods: {
        selectIndex: function (index) {
            this.selectedIndex = index;
        }
    }
});