<script lang="ts">
	import FormDecisionMetadata from './FormDecisionMetadata.svelte';

	type Props = {
		onCancel: () => void;
		onSuccess?: () => void;
		mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
	};
	let { onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<FormDecisionMetadata
	action="?/addDecision"
	submitLabel="Add"
	{onCancel}
	{onSuccess}
	{mockSubmit}
/>
