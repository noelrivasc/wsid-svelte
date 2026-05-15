import type { Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { getAuth } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const auth = getAuth();
  const session = await auth.api.getSession({ headers: event.request.headers });
  event.locals.user = session?.user ?? null;
  event.locals.session = session?.session ?? null;
  return svelteKitHandler({ event, resolve, auth, building });
};
