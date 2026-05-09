<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button } from 'flowbite-svelte';
	import FactorForm from './FactorForm.svelte';
	import type { Factor } from '$lib/schemas';

	type Props = {
		factor: Factor;
		onCancel: () => void;
		onSuccess?: () => void;
		mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
		mockDelete?: (data: Record<string, FormDataEntryValue>) => void;
	};
	let { factor, onCancel, onSuccess, mockSubmit, mockDelete }: Props = $props();

	const deleteSubmit: SubmitFunction = ({ formData, cancel }) => {
		if (mockDelete) {
			mockDelete(Object.fromEntries(formData));
			cancel();
			return;
		}
		return async ({ result, update }) => {
			await update();
			if (result.type === 'success') onSuccess?.();
		};
	};
</script>

<div class="flex flex-col gap-6">
	<FactorForm
		action="?/editFactor"
		initial={factor}
		submitLabel="Save"
		{onCancel}
		{onSuccess}
		{mockSubmit}
	/>
</div>
