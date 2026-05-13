import type { Scenario, ScenariosList } from '$lib/schemas';

export const scenarioIds = {
	stay: '82c506b6-317c-47f6-8b0a-7db8a036a44f',
	newJob: '9c5fd741-2e8a-436c-828a-5f4ee8541056',
	indie: '34301ba2-2425-4fd3-baa8-fac4907194e1'
} as const;

export const stayScenario: Scenario = {
	id: scenarioIds.stay,
	title: 'Stay at current job',
	description: 'Keep the steady salary, the team I know, and the predictable workload.'
};

export const newJobScenario: Scenario = {
	id: scenarioIds.newJob,
	title: 'Take the new offer',
	description: 'Higher salary, new domain, longer commute, less equity.'
};

export const indieScenario: Scenario = {
	id: scenarioIds.indie,
	title: 'Go independent'
};

export const sampleScenarios: ScenariosList = [stayScenario, newJobScenario, indieScenario];

export const formSampleScenario: Scenario = {
	id: 'b1f3d8b2-3e0c-4d2f-9a4f-1c2e7b9d4a01',
	title: 'Take the new offer',
	description: 'Higher salary, new domain, longer commute, less equity.'
};

export const formMinimalScenario: Scenario = {
	id: 'd4a2c1f6-7e9b-4c3a-8a1d-9f5e2b6c7d02',
	title: 'Go independent'
};
