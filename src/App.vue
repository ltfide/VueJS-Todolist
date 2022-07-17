<template>
   <h1>Todolist</h1>
   <div class="todolist-add">
      <input type="text" v-model="newTodo" @keyup.enter="addTodo" />
      <button @click="addTodo" :disabled="newTodo === ''">+</button>
   </div>
   <!-- <ul >
      <li style="display: flex; gap: 1rem; margin: auto; justify-content: center">
         <input type="checkbox" v-model="todo.completed" @change="isComp(todo.completed, todo.id)" />
         <p :class="todo.completed ? 'active' : 'inactive'">{{ todo.todo }}</p>
         <p @click="deleteTodo(todo.id)">X</p>
      </li>
   </ul> -->
   <ul v-for="todo in todolist" :key="todo.id">
      <li class="todolist-box">
         <input type="checkbox" v-model="todo.completed" @change="isComp(todo.completed, todo.id)" />
         <p :class="todo.completed ? 'active' : 'inactive'">{{ todo.todo }}</p>
         <button @click="deleteTodo(todo.id)">&times;</button>
      </li>
   </ul>
</template>

<script>
export default {
   name: "App",
   data: () => ({
      isCompeleted: true,
      todolist: [],
      newTodo: "",
   }),
   methods: {
      isComp(value, id) {
         console.log(value, id);
         console.log(this.todolist);
      },
      async addTodo() {
         if (this.newTodo == "") {
            return;
         }

         const res = await fetch("http://localhost:3000/todolist", {
            method: "POST",
            body: JSON.stringify({ todo: this.newTodo }),
         });

         this.todolist = await res.json();
         this.newTodo = "";
      },
      async deleteTodo(id) {
         const res = await fetch("http://localhost:3000/delete/todolist", {
            method: "POST",
            body: JSON.stringify({ id: id }),
         });

         this.todolist = await res.json();
      },
   },
   async mounted() {
      const res = await fetch("http://localhost:3000/todolist");

      this.todolist = await res.json();
      // this.todolist = data;
   },
};
</script>

<style>
* {
   margin: 0;
   padding: 0;
}

body {
   background: Rgb(244, 236, 216);
}

.todolist-add {
   width: 300px;
   margin: 1.2rem auto;
   display: flex;
   align-content: center;
   justify-content: center;
}

.todolist-add input {
   width: 80%;
   padding: 0.5rem;
   outline: none;
   border: 1px solid gray;
   border-top-left-radius: 5px;
   border-end-start-radius: 5px;
}

.todolist-add button {
   width: 20%;
   padding: 0 1.2rem;
   cursor: pointer;
   border: 1px solid gray;
   border-top-right-radius: 5px;
   border-end-end-radius: 5px;
   background: green;
   color: white;
}

.todolist-add button:hover {
   opacity: 0.8;
}

.todolist-add button:disabled {
   background: transparent;
   color: gray;
}

.todolist-box {
   width: 300px;
   margin: 0.5rem auto;
   display: flex;
   justify-content: space-between;
   align-content: center;
   gap: 1rem;
   background: white;
   padding: 0.5rem;
   box-sizing: border-box;
   border-radius: 5px;
   box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}

.todolist-box input {
   width: 10%;
   cursor: pointer;
}

.todolist-box p {
   width: 80%;
   text-align: left;
}

.todolist-box button {
   width: 10%;
   cursor: pointer;
   outline: none;
   border: 1px solid gray;
   border-radius: 5px;
}

.todolist-box button:hover {
   background: rgb(219, 60, 92);
   color: white;
   transition: 0.5s;
}

.todolist-box p.active {
   color: gray;
   text-decoration: line-through;
}

/* button {
   padding: 1px 10px;
} */

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
}
</style>
