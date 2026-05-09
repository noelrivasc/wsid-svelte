<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FormDecisionMetadataAdd from './FormDecisionMetadataAdd.svelte';
	import FormDecisionMetadataEdit from './FormDecisionMetadataEdit.svelte';
	import { sampleMetadata, minimalMetadata } from '$lib/test_data';

	const { Story } = defineMeta({
		title: 'Components/Decision/FormDecisionMetadata',
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Form for creating or editing a decision\'s metadata (title and description). Always consume via the `FormDecisionMetadataAdd` or `FormDecisionMetadataEdit` wrappers — they expose mode-specific prop shapes and keep call sites unambiguous. The underlying `FormDecisionMetadata` is an implementation detail and should not be imported directly. In Storybook, pass `mockSubmit` to intercept submission and inspect the form data via the Actions panel.'
				}
			}
		}
	});
</script>

<Story name="FormDecisionMetadataAdd">
	<FormDecisionMetadataAdd mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="FormDecisionMetadataEdit">
	<FormDecisionMetadataEdit metadata={sampleMetadata} mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="FormDecisionMetadataEdit: minimal">
	<FormDecisionMetadataEdit metadata={minimalMetadata} mockSubmit={fn()} onCancel={fn()} />
</Story>
