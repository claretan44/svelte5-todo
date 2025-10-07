<script lang="ts">
	import LoginForm from "./LoginForm.svelte";
    let { form } = $props();
</script>
<main class="max-w-3xl mx-auto flex flex-col justify-center-safe items-center md:flex-row md:justify-evenly h-dvh">
        <div class="md:flex md:flex-col md:justify-center-safe">
            <img class="max-w-20 md:max-w-full" src="/watermelon.png" alt="logo">
        </div>
        <div class="md:flex md:flex-col md:justify-center-safe space-y-2">
            <h1 class="text-center text-2xl font-semibold md:text-left">Buri Melon</h1>
            <p class="text-center md:text-left text-sm text-neutral-600 pb-2" id="loginInstructions">Please enter your details to log in.</p>
            {#if form?.error}
                <p class="text-red-600 text-center" id="errorMessage">{form.error}</p>
            {/if}
            <LoginForm />
        </div>
    </main>