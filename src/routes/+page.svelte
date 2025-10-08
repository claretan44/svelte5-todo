<script lang="ts">
    import TodoListApp from './TodoListApp.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    import { page } from '$app/state';
	import NavBar from './NavBar.svelte';
	import UserProfile from './UserProfile.svelte';

    let todoDisplayed = $state(true);
    let profileDisplayed = $state(false);

    function displayTodo(){
        todoDisplayed = true;
        profileDisplayed = false;
    }

    function displayProfile(){
        todoDisplayed = false;
        profileDisplayed = true;
    }
  
</script>


<NavBar {displayTodo} {displayProfile} />
<main class="flex flex-col justify-center items-center p-4">
    {#if todoDisplayed}
        {#if data.user}
            <TodoListApp user={{id: data.user.id, username: data.user.username}} />
        {/if}
    {/if}

    {#if profileDisplayed}
        {#if data.user}
            <UserProfile userProfile={{
                image: data.user.image, 
                firstName: data.user.firstName, 
                lastName: data.user.lastName,
                email: data.user.email}} />
        {/if}
    {/if}
</main>

