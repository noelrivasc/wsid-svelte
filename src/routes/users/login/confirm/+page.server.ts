import { error, redirect } from '@sveltejs/kit';
import { getAuth } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const token = url.searchParams.get('token');
  if (!token) throw redirect(303, '/users/login');
  // Do NOT consume the token here. Just hand it to the form so a POST can.
  return { token };
};

export const actions: Actions = {
  default: async ({ request, url }) => {
    const data = await request.formData();
    const token = data.get('token');
    if (typeof token !== 'string' || !token) {
      throw error(400, 'Missing token');
    }

    try {
      await getAuth().api.magicLinkVerify({
        query: { token },
        headers: request.headers
      });
    } catch {
      throw redirect(303, '/users/login');
    }

    const redirectTo = url.searchParams.get('redirectTo');
    const safeRedirect =
      redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')
        ? redirectTo
        : '/';
    throw redirect(303, safeRedirect);
  }
};
