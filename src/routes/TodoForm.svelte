<script lang="ts">
	import type { Todo } from "$lib/utils/types";


    //props
    let {
        submitAction, 
        todoDefaultValues,
        mode,
    }:{
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
    }
</script>

<form onsubmit={submitHandler}>
    <label>
        Title
        <input type="text" name="title" bind:value={todoTitle}/>
    </label>
    <label>
        Description
        <textarea name="description" bind:value={todoDescription}>
        </textarea>
    </label>
    <label>
        Due Date
        <input type="date" name="dueDate" bind:value={todoDueDate}/>
    </label>
    <label>
        Priority
        <select bind:value={todoPriority}>
            {#each priorities as priority}
                <option value ={priority}>{priority}</option>
            {/each}
        </select>
    </label>
    <button type="submit">
        {mode === 'add'? 'Add': 'Save'}
    </button>
</form>