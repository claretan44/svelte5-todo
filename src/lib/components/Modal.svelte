<script lang="ts">
    //bind isOpen prop so that the child component can modify it
    let {isOpen = $bindable(), title, children } = $props();

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

<dialog bind:this={dialog} class="m-auto backdrop:bg-black/60 backdrop:backdrop-blur-sm rounded-2xl shadow-2xl max-w-lg w-full">
    <div class="bg-white rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold">{title}</h2>
            <button onclick={()=>{isOpen=false;}} aria-label="Close Modal" class="text-gray-600 hover:text-gray-800 focus:outline-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="overflow-y-auto p-6 flex-1">
            {@render children()}
        </div>
    </div>
    
</dialog>