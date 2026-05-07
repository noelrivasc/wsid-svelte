<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Decision from './Decision.svelte';
	import type { Decision as DecisionType } from '$lib/schemas';

	const sample: DecisionType = {
		metadata: {
			title: 'Accept the new job offer',
			description:
				'A senior engineering role at a smaller company. Higher base salary but less equity, and a longer commute. Need to weigh growth, compensation, and lifestyle.'
		},
		factors: [
			{
				id: '11111111-1111-1111-1111-111111111111',
				title: 'Salary',
				description: 'Total compensation including bonus and equity.',
				weight: 9
			},
			{
				id: '22222222-2222-2222-2222-222222222222',
				title: 'Commute',
				description: 'Time and stress of getting there each day.',
				weight: 6
			},
			{
				id: '33333333-3333-3333-3333-333333333333',
				title: 'Team culture',
				weight: 8
			}
		],
		scenarios: [],
		scenarioFactorValues: {}
	};

	const { Story } = defineMeta({
		title: 'Components/Decision/Decision',
		component: Decision,
		tags: ['autodocs'],
		args: {
			decision: sample,
			onEditMetadata: fn(),
			onAddFactor: fn(),
			onEditFactor: fn()
		}
	});
</script>

<Story name="Default" />
