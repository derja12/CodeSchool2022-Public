var app = new Vue({
    el: '#app',
    data: {
        dice: [
            {sides:4,display:null}, 
            {sides:6,display:null}, 
            {sides:12,display:null}
        ]
    },
    methods: {
        rollDie: function (index) {
            let clickedDie = this.dice[index];
            let roll = Math.floor(Math.random()*this.dice[index].sides) + 1;
            clickedDie.display = roll;
        }
    },
    created : function () {
        console.log(this.dice)
        // alert("Roll some dice!");
    }
})