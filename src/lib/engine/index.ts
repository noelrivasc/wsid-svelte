export * from './reducer';
import type { Decision, Action } from '$lib/schemas';
import { replay } from './reducer';
import { getScoredScenarios } from './scoring';

/** Loader-facing wrapper: `null` in (decision missing) → `null` out, else `replay`. */
export function hydrate(actions: Action[] | null): Decision | null {
  // Null actions indicate a nonexistent decision
  if (actions === null) return null;

  const decision: Decision = replay(actions);
  return { ...decision, scenarios: getScoredScenarios(decision) };
}
