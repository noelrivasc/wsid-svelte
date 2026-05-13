<script lang="ts">
	import ScenarioForm from './ScenarioForm.svelte';
	import type { Scenario } from '$lib/schemas';

	type Props = {
		scenario: Scenario;
		onCancel: () => void;
		onSuccess?: () => void;
		mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
	};
	let { scenario, onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<div class="flex flex-col gap-6">
	<ScenarioForm
		action="?/editScenario"
		initial={scenario}
		submitLabel="Save"
		{onCancel}
		{onSuccess}
		{mockSubmit}
	/>
</div>
