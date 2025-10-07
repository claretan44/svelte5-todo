// src/hooks.server.ts
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('auth-token');
  
  // If user has a token, verify it and get user info
  if (token) {
    try {
      // Fetch user info from DummyJSON using the token
      const response = await fetch('https://dummyjson.com/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        // Store user data in locals (available in all load functions and actions)
        event.locals.user = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          token: token
        };
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If token is invalid, clear it
      event.cookies.delete('auth-token', { path: '/' });
    }
  }
  
  // Protect all routes except /login
  if (!event.locals.user && event.url.pathname !== '/login') {
    throw redirect(303, '/login');
  }
  
  // If logged in and trying to access /login, redirect to home
  if (event.locals.user && event.url.pathname === '/login') {
    throw redirect(303, '/');
  }
  
  return resolve(event);
};