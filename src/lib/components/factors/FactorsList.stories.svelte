<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FactorsList from './FactorsList.svelte';
	import type { Factors } from '$lib/schemas';

	const sampleFactors: Factors = [
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
			description: 'How well I gel with the people I work with.',
			weight: 8
		},
		{
			id: '44444444-4444-4444-4444-444444444444',
			title: 'Tech stack',
			weight: 3
		},
		{
			id: '55555555-5555-5555-5555-555555555555',
			title: 'Office snacks',
			description: 'Negligible but worth tracking.',
			weight: 0
		}
	];

	const { Story } = defineMeta({
		title: 'Components/Factors/FactorsList',
		component: FactorsList,
		tags: ['autodocs'],
		args: {
			factors: sampleFactors,
			onAdd: fn(),
			onEdit: fn()
		}
	});
</script>

<Story name="Default" />

<Story name="Empty" args={{ factors: [], onAdd: fn(), onEdit: fn() }} />

<Story
	name="SingleFactor"
	args={{
		factors: [
			{
				id: '11111111-1111-1111-1111-111111111111',
				title: 'Just one thing',
				description: 'Only one factor in the list.',
				weight: 5
			}
		],
		onAdd: fn(),
		onEdit: fn()
	}}
/>
