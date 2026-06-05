// Runtime config for CLI scripts (tsx), where $env/dynamic/private is unavailable.
// Imports getConfig() from the sibling module and passes process.env.
// CLI scripts should import config from this module instead of config.ts.
//
// The --env-file-if-exists=.env flag (see package.json scripts) populates
// process.env before the script runs.

import { getConfig } from './getConfig';

export const config = getConfig(process.env);
