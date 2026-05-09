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

	<form
		method="POST"
		action="?/deleteFactor"
		use:enhance={deleteSubmit}
		class="border-t border-c03 pt-4"
	>
		<input type="hidden" name="id" value={factor.id} />
		<Button type="submit" class="bg-red text-body-inverted hover:bg-red/90 focus:ring-c01">
			Delete
		</Button>
	</form>
</div>
