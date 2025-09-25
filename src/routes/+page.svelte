<script>
    import TodoList from './TodoList.svelte';
    //later on load this from local storage
    const todos =$state([
        {
            id: 'todo-1',
            title: 'My First Todo',
            description: 'Enter your description here',


        }
    ]);
</script>

<TodoList {todos}/>