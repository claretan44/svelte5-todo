<script>
    import AddTodo from "./AddTodo.svelte";
    let { todos } = $props();
</script>

{#each todos as todo (todo.id)}
    <p>{todo.title}</p>
{/each}

<AddTodo {todos} />
