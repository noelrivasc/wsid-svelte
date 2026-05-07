<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FormDecisionMetadataAdd from './FormDecisionMetadataAdd.svelte';
	import FormDecisionMetadataEdit from './FormDecisionMetadataEdit.svelte';
	import type { DecisionMetadata } from '$lib/schemas';

	const sampleMetadata: DecisionMetadata = {
		title: 'Accept the new job offer',
		description:
			'A senior engineering role at a smaller company. Higher base salary but less equity, and a longer commute. Need to weigh growth, compensation, and lifestyle.'
	};

	const minimalMetadata: DecisionMetadata = {
		title: 'Move to Lisbon',
		description: ''
	};

	const { Story } = defineMeta({
		title: 'Components/Decision/FormDecisionMetadata',
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Form for creating or editing a decision\'s metadata (title and description). Always consume via the `FormDecisionMetadataAdd` or `FormDecisionMetadataEdit` wrappers — they expose mode-specific prop shapes and keep call sites unambiguous. The underlying `FormDecisionMetadata` is an implementation detail and should not be imported directly.'
				}
			}
		}
	});
</script>

<Story name="FormDecisionMetadataAdd">
	<FormDecisionMetadataAdd onAdd={fn()} onCancel={fn()} />
</Story>

<Story name="FormDecisionMetadataEdit">
	<FormDecisionMetadataEdit
		metadata={sampleMetadata}
		onSave={fn()}
		onDelete={fn()}
		onCancel={fn()}
	/>
</Story>

<Story name="FormDecisionMetadataEdit: minimal">
	<FormDecisionMetadataEdit
		metadata={minimalMetadata}
		onSave={fn()}
		onDelete={fn()}
		onCancel={fn()}
	/>
</Story>
