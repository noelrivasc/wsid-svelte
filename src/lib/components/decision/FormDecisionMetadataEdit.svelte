<script lang="ts">
	import FormDecisionMetadata from './FormDecisionMetadata.svelte';
	import type { DecisionMetadata } from '$lib/schemas';

	type Props = {
		metadata: DecisionMetadata;
		onCancel: () => void;
		onSuccess?: () => void;
		mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
	};
	let { metadata, onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<FormDecisionMetadata
	action="?/editMetadata"
	initial={metadata}
	submitLabel="Save"
	{onCancel}
	{onSuccess}
	{mockSubmit}
/>
