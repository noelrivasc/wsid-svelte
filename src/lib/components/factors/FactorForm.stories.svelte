<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import FactorFormAdd from './FactorFormAdd.svelte';
	import FactorFormEdit from './FactorFormEdit.svelte';
	import type { Factor } from '$lib/schemas';

	const sampleFactor: Factor = {
		id: '2b17d903-a844-4ee7-b950-a0ac8c7ecb70',
		title: 'Salary',
		description: 'Total compensation including bonus and equity.',
		weight: 9
	};

	const minimalFactor: Factor = {
		id: '64d91db7-9f95-4f00-9426-e479cd479f6d',
		title: 'Tech stack',
		weight: 3
	};

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
	<FactorFormEdit factor={sampleFactor} onSave={fn()} onDelete={fn()} onCancel={fn()} />
</Story>

<Story name="FactorFormEdit: minimal">
	<FactorFormEdit factor={minimalFactor} onSave={fn()} onDelete={fn()} onCancel={fn()} />
</Story>
