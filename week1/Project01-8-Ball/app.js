const textPurple = "rgba(226, 150, 226, 1)";
const textTransparent = "rgba(226, 150, 226, 0)";
const API_URL = "https://cs2022-eight-ball.herokuapp.com";

var app = new Vue({
    el: '#app',
    data: {

        // Response Data        
        responsePrompts: [
            {text: "Yes"},
            {text: "No"},
            {text: "Maybe"},
            {text: "Ask Again Tomorrow"},
            {text: "Likely"},
            {text: "Not Likely"},
            {text: "Never"},
            {text: "Almost Certainly"},
            {text: "Probably Not"}
        ],
        defaultPrompt: {text: "Ask a Yes or No Question"},

        responseStyle: {
            color: "rgba(226, 150, 226, 1)"
        },

        currentResponseIndex: -1,
        displayResponse: "",


        // Question Data
        questionInput: "",
        readyForQuestion: true

    },
    methods: {
        // askQuestion: function () {
        //     if (!this.validQuestion) {return;}

        //     this.questionInput = "";
        //     this.readyForQuestion = false;

        //     this.responseStyle.color = textTransparent;
        //     this.currentResponseIndex = Math.floor(Math.random() * this.responsePrompts.length);
            
        //     setTimeout(() => {
        //         this.updateDisplayResponse();
        //         this.responseStyle.color = textPurple;
        //         setTimeout(() => {
        //             this.readyForQuestion = true;
        //         }, 1000);
        //     }, 2500);
        // },
        askQuestion: function () {
            if (!this.validQuestion) {return;}

            fetch(`${API_URL}/questions`).then((response) => {
                response.json().then((data) => {
                    this.responseStyle.color = textTransparent;
                    setTimeout(() => {
                        this.displayResponse = data['answer'];
                        this.responseStyle.color = data['color'];
                        setTimeout(() => {
                            this.readyForQuestion = true;
                        }, 1000);
                    }, 2500);
                });
            });
            this.questionInput = "";
            this.readyForQuestion = false;
        },
        updateDisplayResponse: function () {
            let index = this.currentResponseIndex;
            if (index == -1) {
                this.displayResponse = this.defaultPrompt.text;
            }

            else {
                this.displayResponse = this.responsePrompts[index].text;
            }
        }
    },
    computed : {
        validQuestion: function () {
            let lastIndex = this.questionInput.length - 1;
            return this.questionInput[lastIndex] == "?";
        }
    },
    created : function () {
        this.updateDisplayResponse()
    }
})