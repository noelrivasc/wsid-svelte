<script lang="ts">
	import FormDecisionMetadata from './FormDecisionMetadata.svelte';
	import type { DecisionMetadata } from '$lib/schemas';

	type Props = {
		metadata: DecisionMetadata;
		onSave: (metadata: DecisionMetadata) => void;
		onDelete: (metadata: DecisionMetadata) => void;
		onCancel: () => void;
	};
	let { metadata, onSave, onDelete, onCancel }: Props = $props();
</script>

<FormDecisionMetadata
	initial={metadata}
	submitLabel="Save"
	onSubmit={onSave}
	{onCancel}
	onDelete={() => onDelete(metadata)}
/>
