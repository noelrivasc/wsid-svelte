// SvelteKit config: wraps getConfig() with the SvelteKit-provided env.

// This is the first-class config for all SvelteKit server code.
// Modules shared with the CLI, however, should use config.runtime.ts
// to side-step svelte dependencies.

import { env } from '$env/dynamic/private';
import { getConfig } from './getConfig';

export const config = getConfig(env);
