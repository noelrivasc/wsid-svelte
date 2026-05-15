import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { getAuth } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';

const NEUTRAL_MESSAGE = 'If an account exists for that email, a login link has been sent.';

const emailSchema = z.object({ email: z.email() });

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, '/users/me');
  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const parsed = emailSchema.safeParse({ email: data.get('email') });
    // Always respond with the same neutral message — never reveal whether
    // the address exists, or whether the send succeeded.
    if (!parsed.success) {
      return fail(400, { message: NEUTRAL_MESSAGE });
    }
    try {
      await getAuth().api.signInMagicLink({
        body: { email: parsed.data.email },
        headers: request.headers
      });
    } catch {
      // swallow — uniform response
    }
    return { message: NEUTRAL_MESSAGE };
  }
};
