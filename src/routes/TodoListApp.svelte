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
            priority: 'High',
            completed: false
        }
    ]);
    
    const priorityMap: StringIndex = {
        'High': 3,
        'Medium': 2,
        'Low': 1
    };

    interface StringIndex {
        [key:string]: any;
    }
    /*
    let orderedTodos = $derived(
        todos.sort((a,b) => {
            return (priorityMap[b.priority] - priorityMap[a.priority]);
        })
    );*/
    let addTodoIsOpen: boolean = $state(false);
    let editTodoIsOpen: boolean = $state(false);
    let todoIndexToEdit: number= $state(0);
    let todoToEdit: Todo = $derived(todos[todoIndexToEdit]);

    const blankTodo:Todo ={
        id: '',
        title: '',
        description: '',
        dueDate: '2025-12-31',
        priority: 'High',
        completed: false
    }
    //callback functions for modifying todos and todolist

    function completeTodo(todo: Todo){
        todo.completed = !todo.completed;
    }

    function addTodo(title:string, description:string, dueDate:string, priority:string){
        let newTodo:Todo = {
            id: 'todo-' + (todos.length + 1),
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };
        todos.push(newTodo);
    }

    function openEditingWindow(index: number){
        editTodoIsOpen = true;
        todoIndexToEdit  = index;
    }

    function editTodo(title:string, description:string, dueDate:string, priority:string){
        let editedTodo:Todo = {
            id: 'todo-' + (todoIndexToEdit + 1),
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };
        todos[todoIndexToEdit] = editedTodo;
    }
    function deleteTodo(index: number){
        todos.splice(index, 1);
    }

    //debug effect
    $effect(() =>{
        $inspect(todoIndexToEdit);
        //$inspect(todos);
    }
    );
</script>

<TodoList {todos} {completeTodo} {deleteTodo} {openEditingWindow}/>

<button onclick={()=>{addTodoIsOpen=true;}}>Add New Todo</button>

<Modal bind:isOpen = {addTodoIsOpen}>
    <TodoForm todoDefaultValues={blankTodo} submitAction={addTodo} mode="add"/>
</Modal>

<Modal bind:isOpen = {editTodoIsOpen}> 
    <TodoForm todoDefaultValues={todoToEdit} submitAction={editTodo} mode="edit"/>
</Modal>