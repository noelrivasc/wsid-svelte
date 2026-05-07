<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FactorFormAdd from './FactorFormAdd.svelte';
	import FactorFormEdit from './FactorFormEdit.svelte';
	import { formSampleFactor, formMinimalFactor } from '$lib/test_data';

	const { Story } = defineMeta({
		title: 'Components/Factors/FactorForm',
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Form for creating or editing a factor. Always consume via the `FactorFormAdd` or `FactorFormEdit` wrappers — they expose mode-specific prop shapes and keep call sites unambiguous. The underlying `FactorForm` is an implementation detail and should not be imported directly.'
				}
			}
		}
	});
</script>

<Story name="FormFactorAdd">
	<FactorFormAdd onAdd={fn()} onCancel={fn()} />
</Story>

<Story name="FactorFormEdit">
	<FactorFormEdit factor={formSampleFactor} onSave={fn()} onDelete={fn()} onCancel={fn()} />
</Story>

<Story name="FactorFormEdit: minimal">
	<FactorFormEdit factor={formMinimalFactor} onSave={fn()} onDelete={fn()} onCancel={fn()} />
</Story>
