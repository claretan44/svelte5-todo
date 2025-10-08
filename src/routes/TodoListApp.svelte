<script lang="ts">

    //imports
    import TodoForm from "./TodoForm.svelte";
    import Modal from "../lib/components/Modal.svelte";
    import TodoList from "./TodoList.svelte";
    import type {Todo} from "../lib/utils/types";
    import { onMount } from 'svelte';

    // Accept user data as prop
    let { user }: { user: { id: number; username: string } } = $props();

    //todo-list variable
    //default value for todo list:
    let todos =$state<Todo[]>([
        {
            id: 'todo-1',
            title: 'My First Todo',
            description: 'Enter your description here',
            dueDate: '2025-12-31',
            priority: 'High',
            completed: false
        }
    ]);

    // Generate user-specific localStorage key
    const getStorageKey = () => `todoList_user_${user.id}`;

    //on component creation, load in local storage if it exists
    onMount(() => {
        const storageKey = getStorageKey();
        const todoItems = window.localStorage.getItem(storageKey);
        if(todoItems != null){
            try{
                todos = JSON.parse(todoItems);
            }
            catch(e){
                console.log(e);
            }
        }
    });
    //the following are for sorting by priority
    const priorityMap: StringIndex = {
        'High': 3,
        'Medium': 2,
        'Low': 1
    };

    interface StringIndex {
        [key:string]: any;
    }
     
    let orderedTodos = $derived<Todo[]>(
        [...todos].sort((a,b) => {
            return (priorityMap[b.priority] - priorityMap[a.priority]);
        })
    );
    //these variables are for communicating with the modal add/edit window
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
        saveToLocalStorage();
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
        saveToLocalStorage();
    }
    function deleteTodo(index: number){
        todos.splice(index, 1);
        saveToLocalStorage();
    }

    function saveToLocalStorage(){
        window.localStorage.setItem(getStorageKey(), JSON.stringify(todos));
    }

</script>

<div class="flex flex-col items-center">
    <h1 class="my-4 text-center text-2xl font-semibold">Welcome {user.username}!</h1>
    <p class="text-center"> Here are your todos: </p>
    <button onclick={()=>{addTodoIsOpen=true;}} class="bg-purple-800 rounded-full text-white px-4 py-1 hover:bg-purple-600 mt-3">Add New Todo</button>
    <TodoList todos={orderedTodos} {completeTodo} {deleteTodo} {openEditingWindow}/>
</div>


<Modal bind:isOpen = {addTodoIsOpen} title="Add New Todo">
    <TodoForm bind:modalIsOpen={addTodoIsOpen} todoDefaultValues={blankTodo} submitAction={addTodo} mode="add"/>
</Modal>

<Modal bind:isOpen = {editTodoIsOpen} title="Edit Todo"> 
    <TodoForm bind:modalIsOpen={editTodoIsOpen} todoDefaultValues={todoToEdit} submitAction={editTodo} mode="edit"/>
</Modal>