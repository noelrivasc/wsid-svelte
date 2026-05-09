<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FactorsList from './FactorsList.svelte';
	import { sampleFactors, singleFactor } from '$lib/test_data';

	const { Story } = defineMeta({
		title: 'Components/Factors/FactorsList',
		component: FactorsList,
		tags: ['autodocs'],
		args: {
			factors: sampleFactors,
			onAdd: fn(),
			onEdit: fn(),
			onDelete: fn()
		}
	});
</script>

<Story name="Default" />

<Story
	name="Empty"
	args={{ factors: [], onAdd: fn(), onEdit: fn(), onDelete: fn() }}
/>

<Story
	name="SingleFactor"
	args={{ factors: [singleFactor], onAdd: fn(), onEdit: fn(), onDelete: fn() }}
/>
