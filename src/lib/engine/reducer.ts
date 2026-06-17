import type { Decision } from '$lib/schemas';
import type { Action } from '$lib/schemas';

// IF the emptyDecision changes, versioning must be implemented
// to avoid breaking the reducer for existing decisions.
// See https://github.com/noelrivasc/wsid-svelte/issues/13
export const emptyDecision: Decision = {
  metadata: { title: '', description: '' },
  factors: [],
  scenarios: [],
  scenarioFactorValues: {}
};

// Pure reducer. No IO, no Date.now(), no random. Timestamps/ids must arrive in payloads.
export function reduce(state: Decision, action: Action): Decision {
  switch (action.type) {
    case 'metadata/edit':
      return { ...state, metadata: action.payload };

    case 'factor/add':
      return { ...state, factors: [...state.factors, action.payload] };

    case 'factor/edit':
      return {
        ...state,
        factors: state.factors.map((f) => (f.id === action.payload.id ? action.payload : f))
      };

    case 'factor/delete': {
      const restValues = Object.fromEntries(
        Object.entries(state.scenarioFactorValues).map(([sid, vals]) => {
          const { [action.payload.id]: _drop, ...rest } = vals;
          return [sid, rest];
        })
      );
      return {
        ...state,
        factors: state.factors.filter((f) => f.id !== action.payload.id),
        scenarioFactorValues: restValues
      };
    }

    case 'scenario/add':
      return { ...state, scenarios: [...state.scenarios, action.payload] };

    case 'scenario/edit':
      return {
        ...state,
        scenarios: state.scenarios.map((s) => (s.id === action.payload.id ? action.payload : s))
      };

    case 'scenario/delete': {
      const { [action.payload.id]: _drop, ...rest } = state.scenarioFactorValues;
      return {
        ...state,
        scenarios: state.scenarios.filter((s) => s.id !== action.payload.id),
        scenarioFactorValues: rest
      };
    }

    case 'scenarioFactorValue/set': {
      const { scenarioId, factorId, value } = action.payload;
      const current = state.scenarioFactorValues[scenarioId] ?? {};
      return {
        ...state,
        scenarioFactorValues: {
          ...state.scenarioFactorValues,
          [scenarioId]: { ...current, [factorId]: value }
        }
      };
    }
  }
}

/** Pure fold over an action log. Use when the decision is known to exist. */
export function replay(actions: Action[]): Decision {
  return actions.reduce(reduce, emptyDecision);
}

/** Loader-facing wrapper: `null` in (decision missing) → `null` out, else `replay`. */
export function hydrate(actions: Action[] | null): Decision | null {
  return actions === null ? null : replay(actions);
}
