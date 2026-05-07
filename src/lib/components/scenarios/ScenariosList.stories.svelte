<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import ScenariosList from './ScenariosList.svelte';
	import type { ScenariosList as ScenariosListType } from '$lib/schemas';

	const sampleScenarios: ScenariosListType = [
		{
			id: '82c506b6-317c-47f6-8b0a-7db8a036a44f',
			title: 'Stay at current job',
			description: 'Keep the steady salary, the team I know, and the predictable workload.'
		},
		{
			id: '9c5fd741-2e8a-436c-828a-5f4ee8541056',
			title: 'Take the new offer',
			description: 'Higher salary, new domain, longer commute, less equity.'
		},
		{
			id: '34301ba2-2425-4fd3-baa8-fac4907194e1',
			title: 'Go independent'
		}
	];

	const { Story } = defineMeta({
		title: 'Components/Scenarios/ScenariosList',
		component: ScenariosList,
		tags: ['autodocs'],
		args: {
			scenarios: sampleScenarios,
			onAdd: fn(),
			onEdit: fn()
		}
	});
</script>

<Story name="Default" />

<Story name="Empty" args={{ scenarios: [], onAdd: fn(), onEdit: fn() }} />
