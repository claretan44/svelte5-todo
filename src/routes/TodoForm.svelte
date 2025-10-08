<script lang="ts">
	import type { Todo } from "$lib/utils/types";


    //props
    let {
        modalIsOpen = $bindable(),
        submitAction, 
        todoDefaultValues,
        mode,
    }:{
        modalIsOpen: boolean;
        submitAction: (title:string, description:string, dueDate:string, priority:string) => void;
        todoDefaultValues: Todo;
        mode: string;
    } =$props();

    //state variables: will bind to form inputs
    let todoTitle = $state(todoDefaultValues.title);
    let todoDescription = $state(todoDefaultValues.description);
    let todoDueDate = $state(todoDefaultValues.dueDate);
    let todoPriority = $state(todoDefaultValues.priority);

    $effect(()=>{
        $inspect(todoDefaultValues);
    })
    $effect(()=>{
        if(mode === 'edit'){
            todoTitle = todoDefaultValues.title;
            todoDescription = todoDefaultValues.description;
            todoDueDate = todoDefaultValues.dueDate;
            todoPriority = todoDefaultValues.priority;
        }
    });
    //options for the priority dropdown
    const priorities = ['Low', 'Medium', 'High'];

    //handles the submit event
    function submitHandler(e: SubmitEvent){
        e.preventDefault();
        submitAction(todoTitle, todoDescription, todoDueDate, todoPriority);
        //reset to blank form for adding
        if (mode === 'add'){
            todoTitle = '';
            todoDescription = '';
            todoDueDate ='2025-12-31';
            todoPriority = 'High';
        }
        modalIsOpen = false;
    }
</script>

<form onsubmit={submitHandler} class="space-y-5">
    <label for="title" class="block text-sm font-medium text-gray-700 mb-1.5">
        Title
        <input type="text" id="title" name="title" bind:value={todoTitle} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"/>
    </label>
    <label for="description" class="block text-sm font-medium text-gray-700 mb-1.5">
        Description
        <textarea name="description" id="description" bind:value={todoDescription} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none" rows="4">
        </textarea>
    </label>
    <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1.5">
        Due Date
        <input type="date" id ="dueDate" name="dueDate" bind:value={todoDueDate} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"/>
    </label>
    <label for="priority" class="block text-sm font-medium text-gray-700 mb-1.5">
        Priority
        <select bind:value={todoPriority} class="font-sans w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white">
            {#each priorities as priority}
                <option value ={priority} class="font-sans">{priority}</option>
            {/each}
        </select>
    </label>
    <button type="submit"  class="bg-purple-800 rounded-full text-white py-1 px-4 hover:bg-purple-600 mt-3">
        {mode === 'add'? 'Add': 'Save'}
    </button>
</form>