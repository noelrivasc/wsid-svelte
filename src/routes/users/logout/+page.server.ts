import { redirect } from '@sveltejs/kit';
import { getAuth } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  throw redirect(303, '/');
};

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      await getAuth().api.signOut({ headers: request.headers });
    } catch {
      // already signed out — fine
    }
    throw redirect(303, '/');
  }
};
