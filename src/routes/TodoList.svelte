<script lang="ts">
    import type {Todo} from "../lib/utils/types";
    let {todos}:{
        todos: Todo[];
    } = $props();
</script>

{#each todos as todo (todo.id)}
    <p>{todo.title}</p>
{/each}