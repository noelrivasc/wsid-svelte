<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import ScenariosList from './ScenariosList.svelte';
	import { sampleScenarios } from '$lib/test_data';

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
