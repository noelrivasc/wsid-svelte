import type { Decision, ScenarioFactorValues } from '$lib/schemas';
import { coreFactors, factorIds } from './factors';
import { sampleScenarios, scenarioIds } from './scenarios';
import { shortMetadata } from './decisionMetadata';

export const sampleScenarioFactorValues: ScenarioFactorValues = {
  [scenarioIds.stay]: {
    [factorIds.salary]: 5,
    [factorIds.commute]: 8,
    [factorIds.culture]: 7
  },
  [scenarioIds.newJob]: {
    [factorIds.salary]: 9,
    [factorIds.commute]: 3,
    [factorIds.culture]: 6
  },
  [scenarioIds.indie]: {
    [factorIds.salary]: 4,
    [factorIds.commute]: 10,
    [factorIds.culture]: null
  }
};

export const sampleDecision: Decision = {
  metadata: shortMetadata,
  factors: coreFactors,
  scenarios: sampleScenarios,
  scenarioFactorValues: sampleScenarioFactorValues
};
