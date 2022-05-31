const textPurple = "rgba(226, 150, 226, 1)";
const textTransparent = "rgba(226, 150, 226, 0)";

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
        questionInput: ""

    },
    methods: {
        askQuestion: function () {
            if (!this.validQuestion) {return;}

            this.responseStyle.color = textTransparent;
            this.currentResponseIndex = Math.floor(Math.random() * this.responsePrompts.length);
            
            setTimeout(() => {
                this.updateDisplayResponse();
                this.responseStyle.color = textPurple;                
            }, 2500);
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