<script lang="ts">

    //props
    let {submitAction, todoDefaultValues} =$props();

    //state variables: will bind to form inputs
    let todoTitle = $state(todoDefaultValues.title);
    let todoDescription = $state(todoDefaultValues.description);
    let todoDueDate = $state(todoDefaultValues.dueDate);
    let todoPriority = $state(todoDefaultValues.priority);

    //options for the priority dropdown
    const priorities = ['Low', 'Medium', 'High'];

    //handles the submit event
    function submitHandler(e: SubmitEvent){
        e.preventDefault();
        submitAction(todoTitle, todoDescription, todoDueDate, todoPriority);
        //reset the form 
        todoTitle = '';
        todoDescription = '';
        todoDueDate ='2025-12-31';
        todoPriority = 'High';
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
    <button type="submit">Add</button>
</form>