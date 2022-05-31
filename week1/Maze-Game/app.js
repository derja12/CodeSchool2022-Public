const DIRECTION = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
};

var app = new Vue({
    el: '#app',
    data: {
        hovering: false,

        MOVE_SCALAR: 50,
        WIDTH: 0,
        HEIGHT: 0,
        
        title: {
            display: 'block',
            "text-align": 'center',
            width: 0,
            fontSize: '6rem',
            color: '#101010',
            
        },
        titleText: "(DEMO) MAZE GAME",

        player: {
            left: 50,
            bottom: 50,
            backgroundColor: "#00aa44",
            position: 'absolute',
            width: '50px',
            height: '50px',
            transition: '.2s'
        },
        
        firstClick: true,
        firstX: null,
        firstY: null,
        newWall: {},
        
        walls: []
    },
    methods: {
        keyEvents: function (event){
            this.WIDTH = window.innerWidth;
            this.HEIGHT = window.innerHeight;
            switch (event.which) {
                case 68:
                case 39:
                    this.moveRight();
                    break;
                case 65:
                case 37:
                    this.moveLeft();
                    break;
                case 87:
                case 38:
                    this.moveUp();
                    break;
                case 83:
                case 40:
                    this.moveDown();
                    break;
                case 16:
                    this.shiftDown();
                    break;
            }
        },
        keyUpEvents: function (event) {
            switch (event.which) {
                case 16:
                    this.shiftUp();
                    break;
            }
        },
        createWallClick: function (event) {
            let x = event.clientX;
            let y = this.HEIGHT - event.clientY;
            if (this.firstClick) {
                this.firstX = x;
                this.firstY = y;
            } else {
                this.createWall(this.firstX, x, this.firstY, y);
            }
            this.updateNewWall(event);
            this.firstClick = !this.firstClick;
        },
        updateNewWall: function (event) {
            let x1 = this.firstX;
            let y1 = this.firstY;
            let x2 = event.clientX;
            let y2 = this.HEIGHT - event.clientY;
            console.log(x1, x2, y1, y2)

            if (x1 > x2) {
                let temp = x1;
                x1 = x2;
                x2 = temp;
            }
            if (y1 > y2) {
                let temp = y1;
                y1 = y2;
                y2 = temp;
            }
            this.newWall = {
                position: 'absolute',
                width: String(x2 - x1) + "px",
                height: String(y2 - y1) + "px",
                left: x1,
                bottom: y1,
                backgroundColor: "rgba(84, 26, 80, .5)",
            }
            console.log(this.newWall)
        },
        createWall: function (x1, x2, y1, y2) {
            if (x1 == x2 || y1 == y2) { // must have width/height
                return;
            }

            if (x1 > x2) {
                let temp = x1;
                x1 = x2;
                x2 = temp;
            }
            if (y1 > y2) {
                let temp = y1;
                y1 = y2;
                y2 = temp;
            }
            this.walls.push({
                position: 'absolute',
                width: String(x2 - x1) + "px",
                height: String(y2 - y1) + "px",
                left: x1,
                bottom: y1,
                backgroundColor: "rgba(84, 26, 80, 1)",
            })
            this.newWall = {};
        },
        // mouseEvents: function (event) {
        //     if (event.which != 3) {
        //         return;
        //     }
        //     let x = event.clientX;
        //     let y = this.HEIGHT - event.clientY;
        //     if (this.firstClick) {
        //         this.firstX = x;
        //         this.firstY = y;
        //     } else {
        //         this.createWall(this.firstX, x, this.firstY, y);
        //     }
        //     this.firstClick = !this.firstClick;
        // },
        shiftDown: function () {
            this.MOVE_SCALAR /= 5;
        },
        shiftUp: function() {
            this.MOVE_SCALAR *= 5;
        },
        moveLeft: function () {
            let current_position =  {
                left: this.player.left,
                bottom: this.player.bottom
            }
            let next_position = {
                left: current_position.left - this.MOVE_SCALAR,
                bottom: this.player.bottom
            }
            if (next_position.left < 0) {
                next_position.left = 0;
            }
            let final_position = this.checkForCollisions(current_position, next_position, DIRECTION.Left);
            this.player.left = final_position.left;

            // this.player.left -= this.MOVE_SCALAR;
            // if (this.player.left < 0) {
            //     this.player.left = 0;
            // }   
        },
        moveRight: function () {
            let current_position =  {
                left: this.player.left,
                bottom: this.player.bottom
            }
            let next_position = {
                left: current_position.left + this.MOVE_SCALAR,
                bottom: this.player.bottom
            }
            if (next_position.left > this.WIDTH - 50) {
                next_position.left = this.WIDTH - 50;
            }
            let final_position = this.checkForCollisions(current_position, next_position, DIRECTION.Right);
            this.player.left = final_position.left;
            
            // this.player.left += this.MOVE_SCALAR;
            // if (this.player.left > this.WIDTH - 50) {
            //     this.player.left = this.WIDTH - 50;
            // }
        },
        moveUp: function () {
            let current_position =  {
                left: this.player.left,
                bottom: this.player.bottom
            }
            let next_position = {
                left: current_position.left,
                bottom: this.player.bottom + this.MOVE_SCALAR
            }
            if (next_position.bottom > this.HEIGHT - 50) {
                next_position.bottom = this.HEIGHT - 50;
            }
            let final_position = this.checkForCollisions(current_position, next_position, DIRECTION.Up);
            this.player.bottom = final_position.bottom;

            // this.player.bottom += this.MOVE_SCALAR;
            // if (this.player.bottom > this.HEIGHT - 50) {
            //     this.player.bottom = this.HEIGHT - 50;
            // }
        },
        moveDown: function () {
            let current_position =  {
                left: this.player.left,
                bottom: this.player.bottom
            }
            let next_position = {
                left: current_position.left,
                bottom: this.player.bottom - this.MOVE_SCALAR
            }
            if (next_position.bottom < 0) {
                next_position.bottom = 0;
            }
            let final_position = this.checkForCollisions(current_position, next_position, DIRECTION.Down);
            this.player.bottom = final_position.bottom;

            // this.player.bottom -= this.MOVE_SCALAR;
            // if (this.player.bottom < 0) {
            //     this.player.bottom = 0;
            // }   
        },
        checkForCollisions: function (oldPosition, newPosition, direction) {
            for (let i = 0; i < this.walls.length; i++) {
                let wall = this.walls[i];
                let left_side = wall.left;
                let right_side = wall.left + Number(wall.width.split("p")[0]);
                let bottom_side = wall.bottom;
                let top_side = wall.bottom + Number(wall.height.split("p")[0]);

                if (direction == DIRECTION.Left && // left move
                    oldPosition.bottom >= bottom_side - Number(this.player.height.split("p")[0]) && // within the right height?
                    oldPosition.bottom <= top_side &&
                    oldPosition.left >= right_side){ // are we to the right of the wall?
                    if (newPosition.left <= right_side) {
                        newPosition.left = right_side + 1;
                    }
                }
                
                if (direction == DIRECTION.Right && // right move
                    oldPosition.bottom >= bottom_side - Number(this.player.height.split("p")[0]) && // within the right height?
                    oldPosition.bottom <= top_side &&
                    oldPosition.left <= left_side - Number(this.player.width.split("p")[0])){ // are we to the left of the wall?
                    if (newPosition.left >= left_side - Number(this.player.width.split("p")[0])) {
                        newPosition.left = left_side - Number(this.player.width.split("p")[0]) - 1;
                    }
                }
                
                if (direction == DIRECTION.Up && // up move
                    oldPosition.left >= left_side - Number(this.player.width.split("p")[0]) && // within the right horizontal position?
                    oldPosition.left <= right_side &&
                    oldPosition.bottom <= bottom_side - Number(this.player.height.split("p")[0])){ // are we to the below the wall?
                    if (newPosition.bottom >= bottom_side - Number(this.player.height.split("p")[0])) {
                        newPosition.bottom = bottom_side - Number(this.player.height.split("p")[0]) - 1;
                    }
                }
                
                if (direction == DIRECTION.Down && // down move
                    oldPosition.left >= left_side - Number(this.player.width.split("p")[0]) && // within the right horizontal position?
                    oldPosition.left <= right_side &&
                    oldPosition.bottom >= top_side){ // are we to the above the wall?
                    if (newPosition.bottom <= top_side) {
                        newPosition.bottom = top_side + 1;
                    }
                }
            }
            return newPosition;
        }
    },
    watch: {
        WIDTH(newWIDTH, oldWIDTH) {
            if (this.player.left > newWIDTH - 50) {
                this.player.left = newWIDTH - 50;
            }
        },
        HEIGHT(newHEIGHT, oldHEIGHT) {
            if (this.player.bottom > newHEIGHT - 50) {
                this.player.bottom = newHEIGHT - 50;
            }
        }
      },
    created : function () {
        window.addEventListener("keydown", this.keyEvents);
        window.addEventListener("keyup", this.keyUpEvents);
        // window.addEventListener("mousedown", this.mouseEvents);
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
        this.title.width = window.screen.width;
        this.createWall(400, 405, 100, 400);
        this.createWall(795, 800, 100, 400);
        this.createWall(400, 800, 100, 105);
        this.createWall(400, 510, 395, 400);
        this.createWall(590, 800, 395, 400);
    }
})