import { isRedirect, redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

//types
interface LoginApiError {
  message: string;
}

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    // Basic validation
    if (!username || !password) {
      return fail(400, {
        error: 'Username and password are required'
      });
    }

    //Ensure they're strings
    const usernameStr = username.toString();
    const passwordStr = password.toString();

    if (usernameStr.length === 0 || passwordStr.length === 0) {
      return fail(400, {
        error: 'Username and password cannot be empty'
      });
    }

    try {
        // Call the dummyjson login API
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: usernameStr, 
                password: passwordStr 
            })
        });

        //this checks the response from the API and returns the error message if any
        if (!response.ok) {
            const errorData: LoginApiError = await response.json();
            return fail(response.status, {
                error: (errorData.message) || 'Login failed'
            });
        }

        const result = await response.json();

        if(!result.accessToken){
            return fail(401,{error: 'Please check your username and password.'})
        }
    
    
      // Successful login - store the token securely
      cookies.set('auth-token', result.accessToken, {
        path: '/'}); 

      // Redirect to the proper route on successful login
      throw redirect(303, '/');

    } catch (error) {
        // Redirects are apparently thrown similarly to errors, so don't treat them as such
        if (isRedirect(error)) {
            throw error;
        }

        console.error('Login error:', error);
        return fail(500, {
            error: 'Network error. Please try again.'
        });
    }
  }
};