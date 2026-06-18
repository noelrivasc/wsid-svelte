import type { Decision, Scenario, ScenariosList, Factor } from '$lib/schemas';

/**
 * Compute per-scenario scores by multiplying the values
 * assigned to the scenario for each factor (scenarioFactorValues)
 * by the factors' weights.
 **/
export function getScoredScenarios(decision: Decision): ScenariosList {
  const factorsMap = decision.factors.reduce((acc, factor: Factor): Record<string, Factor> => {
    acc[factor.id] = factor;
    return acc;
  }, {});

  const scoredScenarios = decision.scenarios.map((s: Scenario) => {
    const vals = decision.scenarioFactorValues[s.id];
    let score = 0;
    for (const fid in vals) {
      const weight = factorsMap[fid].weight;
      score += weight * (vals[fid] ?? 0);
    }

    // Keep the function pure; avoid mutating the input Decision
    const newScenario = structuredClone(s);
    newScenario.score = score;
    return newScenario;
  });

  return scoredScenarios;
}

