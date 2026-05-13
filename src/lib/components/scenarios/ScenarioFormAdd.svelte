<script lang="ts">
	import ScenarioForm from './ScenarioForm.svelte';

	type Props = {
		onCancel: () => void;
		onSuccess?: () => void;
		mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
	};
	let { onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<ScenarioForm
	action="?/addScenario"
	submitLabel="Add"
	{onCancel}
	{onSuccess}
	{mockSubmit}
/>
