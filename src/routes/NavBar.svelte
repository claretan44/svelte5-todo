<script lang="ts">
    let {
        displayTodo,
        displayProfile,
    }:{
        displayTodo: () => void;
        displayProfile: () => void;
    } = $props();
</script>

<nav class="bg-purple-800" >
    <div class="mx-auto max-w-xl flex justify-between items-center p-4 bg-purple-800 text-white">
        <div class="space-x-4">
            <button class = "no-underline hover:underline" onclick = {displayTodo}> Todos </button>
            <button class = "no-underline hover:underline" onclick = {displayProfile}> Profile </button>
        </div>
        <form method="POST" action="/logout">
            <button type="submit" class="no-underline hover:underline">Logout</button>
        </form>
    </div>   
</nav>