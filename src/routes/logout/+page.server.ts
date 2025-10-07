import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ cookies }) => {
    // Clear the auth token cookie
    cookies.delete('auth-token', { path: '/' });
    throw redirect(303, '/login');
  }
};