/*
TODO:
    [ ] transition when asking a question
    [ ] input fields for asking a question
    [ ] ...
*/

var app = new Vue({
    el: '#app',
    data: {
        responses: [
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

        currentResponseIndex: -1,
        displayResponse: ""
    },
    methods: {
        askQuestion: function () {
            this.currentResponseIndex = Math.floor(Math.random() * this.responses.length);
            this.updateDisplayResponse();
        },
        updateDisplayResponse: function () {
            let index = this.currentResponseIndex;
            if (index == -1) {
                this.displayResponse = this.defaultPrompt.text;
            }

            else {
                this.displayResponse = this.responses[index].text;
            }
        }
    },
    created : function () {
        this.updateDisplayResponse()
    }
})