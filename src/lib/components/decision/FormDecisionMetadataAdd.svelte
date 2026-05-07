<script lang="ts">
	import FormDecisionMetadata from './FormDecisionMetadata.svelte';
	import type { DecisionMetadata } from '$lib/schemas';

	type Props = {
		onAdd: (metadata: DecisionMetadata) => void;
		onCancel: () => void;
	};
	let { onAdd, onCancel }: Props = $props();
</script>

<FormDecisionMetadata submitLabel="Add" onSubmit={onAdd} {onCancel} />
