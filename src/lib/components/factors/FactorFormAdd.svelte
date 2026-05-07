<script lang="ts">
	import FactorForm from './FactorForm.svelte';
	import type { Factor } from '$lib/schemas';

	type Props = {
		onAdd: (factor: Factor) => void;
		onCancel: () => void;
	};
	let { onAdd, onCancel }: Props = $props();
</script>

<FactorForm submitLabel="Add" onSubmit={onAdd} {onCancel} />
