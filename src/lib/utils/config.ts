// SvelteKit config: wraps getConfig() with the SvelteKit-provided env.
// This is the first-class config — all SvelteKit server code imports from
// this module. CLI scripts should use config.runtime.ts instead.
//
// Env loading: SvelteKit/Vite auto-loads .env in dev/build.

import { env } from '$env/dynamic/private';
import { getConfig } from './getConfig';

export const config = getConfig(env);
