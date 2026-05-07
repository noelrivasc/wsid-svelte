<script lang="ts">
	import FactorForm from './FactorForm.svelte';
	import type { Factor } from '$lib/schemas';

	type Props = {
		factor: Factor;
		onSave: (factor: Factor) => void;
		onDelete: (factor: Factor) => void;
		onCancel: () => void;
	};
	let { factor, onSave, onDelete, onCancel }: Props = $props();
</script>

<FactorForm
	initial={factor}
	submitLabel="Save"
	onSubmit={onSave}
	{onCancel}
	onDelete={() => onDelete(factor)}
/>
