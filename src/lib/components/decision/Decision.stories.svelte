<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Decision from './Decision.svelte';
	import type { Decision as DecisionType } from '$lib/schemas';

	const factorIds = {
		salary: '8199397c-9ea0-4c25-92fe-c86e44089183',
		commute: '8646b36f-2fcd-46ca-bf4a-54facdc15a69',
		culture: 'bbae130b-1f40-4484-a612-7ac1b6689899'
	};

	const scenarioIds = {
		stay: '82c506b6-317c-47f6-8b0a-7db8a036a44f',
		newJob: '9c5fd741-2e8a-436c-828a-5f4ee8541056',
		indie: '34301ba2-2425-4fd3-baa8-fac4907194e1'
	};

	const sample: DecisionType = {
		metadata: {
			title: 'Accept the new job offer',
			description:
				'A senior engineering role at a smaller company. Higher base salary but less equity, and a longer commute. Need to weigh growth, compensation, and lifestyle.'
		},
		factors: [
			{ id: factorIds.salary, title: 'Salary', description: 'Total comp.', weight: 9 },
			{ id: factorIds.commute, title: 'Commute', description: 'Daily travel pain.', weight: 6 },
			{ id: factorIds.culture, title: 'Team culture', weight: 8 }
		],
		scenarios: [
			{ id: scenarioIds.stay, title: 'Stay at current job', description: 'Status quo.' },
			{ id: scenarioIds.newJob, title: 'Take the new offer', description: 'Bigger salary, longer commute.' },
			{ id: scenarioIds.indie, title: 'Go independent' }
		],
		scenarioFactorValues: {
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
		}
	};

	const { Story } = defineMeta({
		title: 'Components/Decision/Decision',
		component: Decision,
		tags: ['autodocs'],
		args: {
			decision: sample,
			onEditMetadata: fn(),
			onAddFactor: fn(),
			onEditFactor: fn(),
			onAddScenario: fn(),
			onEditScenario: fn()
		}
	});
</script>

<Story name="Default" />
