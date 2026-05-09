<script lang="ts">
	import DecisionMetadataForm from './DecisionMetadataForm.svelte';
	import type { DecisionMetadata } from '$lib/schemas';

	type Props = {
		metadata: DecisionMetadata;
		onCancel: () => void;
		onSuccess?: () => void;
		mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
	};
	let { metadata, onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<DecisionMetadataForm
	action="?/editMetadata"
	initial={metadata}
	submitLabel="Save"
	{onCancel}
	{onSuccess}
	{mockSubmit}
/>
