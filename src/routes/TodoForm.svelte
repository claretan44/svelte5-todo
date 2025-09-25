<script lang="ts">
    let {submitAction, todoDefaultValues} =$props();

    let todoTitle = $state(todoDefaultValues.title);
    let todoDescription = $state(todoDefaultValues.description);

    function submitHandler(e: SubmitEvent){
        e.preventDefault();
        submitAction(todoTitle, todoDescription);
        todoTitle = '';
        todoDescription = '';
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
    <button type="submit">Add</button>
</form>