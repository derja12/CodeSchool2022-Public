var url="http://todo2021.codeschool.cloud";

Vue.component('todo-item', {
    props: ['todo'],
    template: `
        <div>
            Name: {{ todo.name }}<br>
            Desc: {{ todo.desc }}<br>
            Finished? <input type="checkbox" v-model="todo.done">
        </div>
    `
})

var app = new Vue({
    el: '#app',
    data: {
        todo_data: []

    },
    methods: {
        testGetRequest: function () {
            fetch(url + "/todo").then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    this.todo_data = data;
                });
            });
        }
    },
    created: function () {
        this.testGetRequest();
    }
})