// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { auth } from '$lib/server/auth';

type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: NonNullable<AuthSession>['user'] | null;
			session: NonNullable<AuthSession>['session'] | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
