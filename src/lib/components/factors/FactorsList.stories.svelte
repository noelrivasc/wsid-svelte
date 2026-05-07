<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FactorsList from './FactorsList.svelte';
	import type { Factors } from '$lib/schemas';

	const sampleFactors: Factors = [
		{
			id: '8199397c-9ea0-4c25-92fe-c86e44089183',
			title: 'Salary',
			description: 'Total compensation including bonus and equity.',
			weight: 9
		},
		{
			id: '8646b36f-2fcd-46ca-bf4a-54facdc15a69',
			title: 'Commute',
			description: 'Time and stress of getting there each day.',
			weight: 6
		},
		{
			id: 'bbae130b-1f40-4484-a612-7ac1b6689899',
			title: 'Team culture',
			description: 'How well I gel with the people I work with.',
			weight: 8
		},
		{
			id: 'da535cbc-dd11-45e0-b780-853f00a1af3f',
			title: 'Tech stack',
			weight: 3
		},
		{
			id: 'dd9bd3d9-2a13-4b44-850e-3d44517430ed',
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
				id: 'd7980ff0-3153-4406-b746-8b20f982da54',
				title: 'Just one thing',
				description: 'Only one factor in the list.',
				weight: 5
			}
		],
		onAdd: fn(),
		onEdit: fn()
	}}
/>
