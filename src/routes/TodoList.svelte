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

    function getPriorityColor(priority: string) {
        switch(priority) {
            case 'High': return 'border-l-red-500';
            case 'Medium': return 'border-l-yellow-500';
            case 'Low': return 'border-l-green-500';
            default: return 'border-l-gray-500';
        }
    }
    
</script>
{#snippet todoCard(todo: Todo)}
    <div class="border border-gray-200 rounded-lg hover:shadow-md">
        <div class="border-l-2 {getPriorityColor(todo.priority)} p-4">
            <div class="flex gap-3">
                <input 
                    checked={todo.completed}
                    onchange={()=> completeTodo(todo)}
                    type="checkbox"
                    class="mt-1 w-4 h-4 text-purple-600 border border-gray-500 rounded-full focus:ring-2 focus:ring-purple-500"
                />
                <div class="space-y-1">
                    <h3 class="wrap-anywhere font-bold {todo.completed ? 'line-through opacity-60' : ''}">
                        {todo.title}
                    </h3>
                    <p class="wrap-anywhere text-sm text-gray-600 {todo.completed ? 'line-through opacity-60' : ''}">
                        {todo.dueDate ? `Due: ${new Date(todo.dueDate).toLocaleDateString()}` : 'No due date'}
                    </p>
                    {#if todo.description}
                    <p class="wrap-anywhere text-sm text-gray-600 {todo.completed ? 'line-through opacity-60' : ''}">
                        {todo.description}
                    </p>
                    {/if}
                </div>
            </div>
            <div class="flex gap-2 mt-3">
                <button 
                    onclick={() => openEditingWindow(todo.id)}
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </button>
                <button 
                    onclick={() => deleteTodo(todo.id)}
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </div>        
    </div>
{/snippet}
{#snippet todoCardOld(todo: Todo)}
    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-start gap-3">
        <!-- Checkbox -->
        <input 
            checked={todo.completed}
            onchange={()=> completeTodo(todo)}
            type="checkbox"
            class="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
        />
        <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="font-medium text-gray-900 break-words {todo.completed ? 'line-through opacity-60' : ''}">
                    {todo.title}
                </h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border {getPriorityColor(todo.priority)} whitespace-nowrap">
                    Priority: {todo.priority}
                </span>
            </div>
            {#if todo.description}
                <p class="text-sm text-gray-600 mb-2 break-words" class:line-through={todo.completed}>
                    {todo.description}
                </p>
            {/if}
            {#if todo.dueDate}
            <div class="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
            </div>
            {/if}
            <!-- Action Buttons -->
            <div class="flex gap-2">
                <button 
                    onclick={() => openEditingWindow(todo.id)}
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </button>
                <button 
                    onclick={() => deleteTodo(todo.id)}
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    </div>
{/snippet}

<div class="mt-4 space-y-3 max-w-2xl px-4 mx-auto">
    {#if todos.length === 0}
    <div class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <h2 class="text-xl font-semibold text-gray-700 mb-1">No todos yet</h2>
      <p class="text-gray-500">Add your first todo to get started!</p>
    </div>
    {:else}
        {#each todos as todo (todo.id)}
            {@render todoCard(todo)}
        {/each}
    {/if}
</div>

