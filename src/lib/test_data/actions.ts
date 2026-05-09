import type { Action, DecisionMetadata } from '$lib/schemas';
import { factorIds, salaryFactor, commuteFactor, cultureFactor } from './factors';
import { scenarioIds, stayScenario, newJobScenario, indieScenario } from './scenarios';
import { sampleMetadata } from './decisionMetadata';

export const sampleDecisionId = 'a8f5e0c2-1d6b-4f7a-9e3c-8b4d2a1c5f6e';

// Initial metadata used to create the canvas (createDecision).
export const sampleInitialMetadata: DecisionMetadata = { title: 'Draft', description: '' };

// Action history applied after createDecision; exercises every action type.
export const sampleActions: Action[] = [
  { type: 'metadata/edit', version: 1, payload: sampleMetadata },

  // factors: add three, edit one, add+delete a fourth
  { type: 'factor/add', version: 1, payload: { ...salaryFactor, id: factorIds.salary, weight: 7 } },
  { type: 'factor/edit', version: 1, payload: { ...salaryFactor, id: factorIds.salary } },
  { type: 'factor/add', version: 1, payload: { ...commuteFactor, id: factorIds.commute } },
  { type: 'factor/add', version: 1, payload: { ...cultureFactor, id: factorIds.culture } },
  {
    type: 'factor/add',
    version: 1,
    payload: {
      id: '00000000-0000-4000-8000-000000000001',
      title: 'To remove',
      description: 'will be deleted',
      weight: 1
    }
  },
  {
    type: 'factor/delete',
    version: 1,
    payload: { id: '00000000-0000-4000-8000-000000000001' }
  },

  // scenarios: add three, edit one
  { type: 'scenario/add', version: 1, payload: { ...stayScenario, id: scenarioIds.stay, title: 'Stay (draft)' } },
  { type: 'scenario/edit', version: 1, payload: { ...stayScenario, id: scenarioIds.stay } },
  { type: 'scenario/add', version: 1, payload: { ...newJobScenario, id: scenarioIds.newJob } },
  { type: 'scenario/add', version: 1, payload: { ...indieScenario, id: scenarioIds.indie } },

  // scenarioFactorValue/set for every cell
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.stay, factorId: factorIds.salary, value: 5 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.stay, factorId: factorIds.commute, value: 8 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.stay, factorId: factorIds.culture, value: 7 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.newJob, factorId: factorIds.salary, value: 9 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.newJob, factorId: factorIds.commute, value: 3 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.newJob, factorId: factorIds.culture, value: 6 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.indie, factorId: factorIds.salary, value: 4 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.indie, factorId: factorIds.commute, value: 10 } },
  { type: 'scenarioFactorValue/set', version: 1, payload: { scenarioId: scenarioIds.indie, factorId: factorIds.culture, value: null } }
];
