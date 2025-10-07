import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // User data is already in locals from hooks.server.ts
  return {
    user: locals.user
  };
};