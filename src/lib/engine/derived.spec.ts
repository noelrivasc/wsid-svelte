import { describe, it, expect } from 'vitest';
import { getScoredScenarios, getFactorsMap, scoreFromValues } from './derived';
import { sampleDecision } from '$lib/test_data/decision';
import { scenarioIds } from '$lib/test_data/scenarios';
import { coreFactors, factorIds } from '$lib/test_data/factors';

describe('scoring', () => {
  it('returns a score for every scenario', () => {
    const scored = getScoredScenarios(sampleDecision);
    expect(scored).toHaveLength(sampleDecision.scenarios.length);
    for (const s of scored) {
      expect(typeof s.score).toBe('number');
    }
  });

  it('computes score as the sum of value * factor weight', () => {
    const scored = getScoredScenarios(sampleDecision);
    const byId = Object.fromEntries(scored.map((s) => [s.id, s]));

    // salary w9, commute w6, culture w8
    expect(byId[scenarioIds.stay].score).toBe(149); // 5*9 + 8*6 + 7*8
    expect(byId[scenarioIds.newJob].score).toBe(147); // 9*9 + 3*6 + 6*8
    expect(byId[scenarioIds.indie].score).toBe(96); // 4*9 + 10*6 + null->0
  });

  it('treats null factor values as zero', () => {
    const scored = getScoredScenarios(sampleDecision);
    const indie = scored.find((s) => s.id === scenarioIds.indie);
    // culture is null for indie, so it contributes nothing: 4*9 + 10*6
    expect(indie?.score).toBe(96);
  });

  it('is pure: does not mutate the input decision', () => {
    getScoredScenarios(sampleDecision);
    for (const s of sampleDecision.scenarios) {
      expect(s).not.toHaveProperty('score');
    }
  });
});

describe('scoreFromValues', () => {
  const factorsMap = getFactorsMap(coreFactors);

  it('sums value * weight, treating null as zero', () => {
    // salary w9, commute w6, culture w8
    const score = scoreFromValues(
      { [factorIds.salary]: 5, [factorIds.commute]: 8, [factorIds.culture]: null },
      factorsMap
    );
    expect(score).toBe(5 * 9 + 8 * 6);
  });

  it('returns 0 for undefined values', () => {
    expect(scoreFromValues(undefined, factorsMap)).toBe(0);
  });

  it('ignores values for factors absent from the map', () => {
    expect(scoreFromValues({ 'missing-factor': 10 }, factorsMap)).toBe(0);
  });

  it('matches getScoredScenarios for the same inputs', () => {
    const scored = getScoredScenarios(sampleDecision);
    const stay = scored.find((s) => s.id === scenarioIds.stay);
    expect(stay?.score).toBe(
      scoreFromValues(
        sampleDecision.scenarioFactorValues[scenarioIds.stay],
        getFactorsMap(sampleDecision.factors)
      )
    );
  });
});
