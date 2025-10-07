<script lang="ts">
    import TodoListApp from './TodoListApp.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    import { page } from '$app/state';
  
</script>

{#if page.url.pathname !== '/login'}
    <nav>
      <form method="POST" action="/logout">
        <button type="submit">Logout</button>
      </form>
    </nav>
  {/if}

<TodoListApp user={data.user} />