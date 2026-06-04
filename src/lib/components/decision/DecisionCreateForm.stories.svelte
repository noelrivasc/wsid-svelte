<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DecisionCreateForm from './DecisionCreateForm.svelte';

	const { Story } = defineMeta({
		title: 'Components/Decision/DecisionCreateForm',
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Route-level form for creating a new decision. Wraps `DecisionMetadataFormAdd` and threads `onCancel`/`onSuccess`/`mockSubmit` through; the route owns navigation. In Storybook, pass `mockSubmit` to intercept submission and inspect the form data via the Actions panel.'
				}
			}
		}
	});
</script>

<Story name="DecisionCreateForm">
	<DecisionCreateForm mockSubmit={fn()} onCancel={fn()} onSuccess={fn()} />
</Story>
