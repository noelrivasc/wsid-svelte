<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DecisionMetadata from './DecisionMetadata.svelte';
	import type { DecisionMetadata as DecisionMetadataType } from '$lib/schemas';

	const sample: DecisionMetadataType = {
		title: 'Accept the new job offer',
		description:
			'A senior engineering role at a smaller company. Higher base salary but less equity, and a longer commute. Need to weigh growth, compensation, and lifestyle.'
	};

	const titleOnly: DecisionMetadataType = {
		title: 'Move to Lisbon',
		description: ''
	};

	const { Story } = defineMeta({
		title: 'Components/Decision/DecisionMetadata',
		component: DecisionMetadata,
		tags: ['autodocs'],
		args: {
			onEdit: fn()
		}
	});
</script>

<Story name="Default" args={{ metadata: sample }} />

<Story name="TitleOnly" args={{ metadata: titleOnly }} />
