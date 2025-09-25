<script lang="ts">
    //bind isOpen prop so that the child component can modify it
    let {isOpen = $bindable(), children } = $props();

    //store the dialog element in a variable to call its open and close functions
    let dialog: HTMLDialogElement;

    //open and close the window whenever isOpen changes value
    $effect(()=>{
        if(isOpen && dialog){
            dialog.showModal();
        }
        else if (dialog.open && (!isOpen && dialog)){
            dialog.close();
        }
    }
    );
</script>

<dialog bind:this={dialog} class="backdrop:bg-black/50">
    {@render children()}
    <button onclick={()=>{isOpen=false;}}>Close Window </button>
</dialog>