import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { getAuth } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';

// Same machinery as /users/login — better-auth's magic-link flow creates
// the account on first use. The route exists for UX framing only; the
// HTTP response must stay uniform with /users/login so account existence
// is not leaked. See AUTH_IMPLEMENTATION.md §"Behavior 2".
const NEUTRAL_MESSAGE = 'Check your email for a link to finish signing up.';

const emailSchema = z.object({ email: z.email() });

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, '/users/me');
  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const parsed = emailSchema.safeParse({ email: data.get('email') });
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
