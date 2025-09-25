<script lang="ts">

    //imports
    import TodoForm from "./TodoForm.svelte";
    import Modal from "./Modal.svelte";
    import TodoList from "./TodoList.svelte";
    import type {Todo} from "../lib/utils/types";


    //variables
    //later on load this from local storage
    const todos =$state<Todo[]>([
        {
            id: 'todo-1',
            title: 'My First Todo',
            description: 'Enter your description here',
            dueDate: '2025-12-31',
            priority: 'High'
        }
    ]);
    
    let addTodoIsOpen = $state(false);
    const blankTodo ={
        title: '',
        description: '',
        dueDate: '2025-12-31',
        priority: 'High'
    }
    //event handler function

    function addTodo(title:string, description:string, dueDate:string, priority:string){
        let newTodo:Todo = {
            id: 'todo-' + (todos.length + 1),
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority
        };
        todos.push(newTodo);
    }

    //debug effect
    $effect(() =>{
        //$inspect(newTodo);
        $inspect(todos);
    }
    );
</script>

<TodoList {todos} />

<button onclick={()=>{addTodoIsOpen=true;}}>Add New Todo</button>
<Modal bind:isOpen = {addTodoIsOpen}>
    <TodoForm todoDefaultValues={blankTodo} submitAction={addTodo}/>
</Modal>