<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Decision from './Decision.svelte';
	import { sampleDecision } from '$lib/test_data';

	const { Story } = defineMeta({
		title: 'Components/Decision/Decision',
		component: Decision,
		tags: ['autodocs'],
		args: {
			decision: sampleDecision,
			onEditMetadata: fn(),
			onAddFactor: fn(),
			onEditFactor: fn(),
			onDeleteFactor: fn(),
			onAddScenario: fn(),
			onEditScenario: fn(),
			onDeleteScenario: fn()
		}
	});
</script>

<Story name="Default" />

<Story name="Read-only" args={{ readOnly: true }} />
