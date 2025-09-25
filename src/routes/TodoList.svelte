<script lang="ts">
    //imports
    import TodoForm from "./TodoForm.svelte";

    //variables
    //later on load this from local storage
    const todos =$state([
        {
            id: 'todo-1',
            title: 'My First Todo',
            description: 'Enter your description here',
        }
    ]);
    
    const blankTodo ={
        title: '',
        description: ''
    }
    //event handler function

    function addTodo(title:string, description:string){
        let newTodo = {
            id: 'todo-' + (todos.length + 1),
            title: title,
            description: description
        };
        todos.push(newTodo);
    }

    //debug effect
    $effect(() =>{
        //$inspect(newTodo);
        $inspect(todos);
    }
    );
</script>

{#each todos as todo (todo.id)}
    <p>{todo.title}</p>
{/each}

<TodoForm todoDefaultValues={blankTodo} submitAction={addTodo}/>
