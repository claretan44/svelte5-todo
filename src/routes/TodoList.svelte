<script lang="ts">
    import type {Todo} from "../lib/utils/types";
    let {
        todos,
        completeTodo,
        deleteTodo,
        openEditingWindow
    }:{
        todos: Todo[];
        completeTodo: (todo: Todo) => void;
        deleteTodo: (index: number) => void;
        openEditingWindow: (todoIndexToEdit: number) => void;
    } = $props();
    
</script>

{#each todos as todo, index (todo.id)}
<div class="flex">
    <input 
        checked={todo.completed}
        onchange={()=> completeTodo(todo)}
        type="checkbox"
    />
    <p class:line-through={todo.completed}>{todo.title}</p>
    <button onclick={() => openEditingWindow(index)}> Edit </button>
    <button onclick={() => deleteTodo(index)}>Delete</button>
</div>
{/each}