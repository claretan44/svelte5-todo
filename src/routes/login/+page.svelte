<main class="max-w-3xl mx-auto flex flex-col justify-center-safe items-center md:flex-row md:justify-evenly h-dvh">
        <div class="md:flex md:flex-col md:justify-center-safe">
            <img class="max-w-20 md:max-w-full" src="img/watermelon transparent.png">
        </div>
        <div class="md:flex md:flex-col md:justify-center-safe space-y-2">
            <h1 class="text-center text-2xl font-semibold md:text-left">Buri Melon</h1>
            <p class="text-center md:text-left text-sm text-neutral-600 pb-2" id="loginInstructions">Please enter your details to log in.</p>
            <form class="flex flex-col mt-2" id="loginForm">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required class="border-purple-300 border-1 rounded-full shadow-sm px-2 py-1 focus:border-2 focus:outline-none focus:border-purple-500 mb-2">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required class="border-purple-300 border-1 rounded-full shadow-sm px-2 py-1 focus:border-2 focus:outline-none focus:border-purple-500 mb-2">
                <button type="submit" class="bg-purple-800 rounded-full text-white py-1 hover:bg-purple-600 mt-3"> Log in</button>
            </form>
            <p class="hidden text-center" id="statusMessage">
            </p>
        </div>
    </main>