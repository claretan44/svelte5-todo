<script>
    let { todos } = $props();
    let newTodo = $state('');

    function addNewTodo(){

        const todo = {
            id: 'todo-' + (todos.length + 1),
            title: newTodo
        }
        todos.push(todo);
        newTodo = '';
    }
</script>
<form onsubmit={addNewTodo}>
    <label>
        New Todo
        <input type="text" name="newTodo" bind:value={newTodo}/>
    </label>
    <button>Add</button>
</form>