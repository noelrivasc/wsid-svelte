import type {
  Decision,
  Scenario,
  ScenariosList,
  Factor,
  FactorsList,
  ScenarioFactorValues
} from '$lib/schemas';

/**
 * Score a single scenario from its factor values: the sum of each
 * value multiplied by the matching factor's weight. Null/missing
 * values contribute nothing. Shared by the canonical scorer and the
 * live preview in the values editor so both use one formula.
 **/
export function scoreFromValues(
  values: ScenarioFactorValues[string] | undefined,
  factorsMap: Record<string, Factor>
): number {
  let score = 0;
  for (const fid in values) {
    const factor = factorsMap[fid];
    if (!factor) continue;
    score += factor.weight * (values[fid] ?? 0);
  }
  return score;
}

/**
 * Compute per-scenario scores by multiplying the values
 * assigned to the scenario for each factor (scenarioFactorValues)
 * by the factors' weights.
 **/
export function getScoredScenarios(decision: Decision): ScenariosList {
  const factorsMap = getFactorsMap(decision.factors);
  const scoredScenarios = decision.scenarios.map((s: Scenario) => {
    // Keep the function pure; avoid mutating the input Decision
    const newScenario = structuredClone(s);
    newScenario.score = scoreFromValues(decision.scenarioFactorValues[s.id], factorsMap);
    return newScenario;
  });

  return scoredScenarios;
}

export function getFactorsMap(factors: FactorsList): Record<string, Factor> {
  return factors.reduce((acc, factor: Factor): Record<string, Factor> => {
    acc[factor.id] = factor;
    return acc;
  }, {});
}
