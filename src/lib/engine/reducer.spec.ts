import { describe, it, expect } from 'vitest';
import { replay } from './reducer';
import { actionSchema } from '$lib/schemas';
import { sampleActions } from '$lib/test_data/actions';
import { sampleDecision } from '$lib/test_data/decision';

describe('reducer', () => {
  it('every fixture action validates against the action schema', () => {
    for (const a of sampleActions) {
      expect(() => actionSchema.parse(a)).not.toThrow();
    }
  });

  it('replaying the demo action list reproduces the sample decision', () => {
    const state = replay(sampleActions);
    expect(state).toEqual(sampleDecision);
  });

  it('factor/delete removes the factor and its scenario values', () => {
    const state = replay(sampleActions);
    expect(
      state.factors.find((f) => f.id === '00000000-0000-4000-8000-000000000001')
    ).toBeUndefined();
    for (const vals of Object.values(state.scenarioFactorValues)) {
      expect(vals).not.toHaveProperty('00000000-0000-4000-8000-000000000001');
    }
  });

  it('reducer is pure: replaying twice yields equal state', () => {
    expect(replay(sampleActions)).toEqual(replay(sampleActions));
  });
});
