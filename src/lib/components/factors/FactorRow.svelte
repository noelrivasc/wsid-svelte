<script lang="ts">
	import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import type { Factor } from '$lib/schemas';
	import WeightCircle from './WeightCircle.svelte';

	type Props = {
		factor: Factor;
		onEdit: (factor: Factor) => void;
		onDelete: (factor: Factor) => void;
	};
	let { factor, onEdit, onDelete }: Props = $props();
</script>

<li class="grid grid-cols-[56px_1fr_auto_auto] items-center gap-2 border-b border-c01 py-3 last:border-b-0">
	<div class="flex justify-center">
		<WeightCircle weight={factor.weight} />
	</div>

	<div class="min-w-0">
		<p class="truncate text-base font-semibold text-body">{factor.title}</p>
		{#if factor.description}
			<p class="truncate text-sm text-body-subtle">{factor.description}</p>
		{/if}
	</div>

	<button
		type="button"
		onclick={() => onEdit(factor)}
		class="rounded-full p-2 text-body-subtle hover:bg-c01 hover:text-body focus:outline-none focus:ring-2 focus:ring-c02"
		aria-label="Edit {factor.title}"
	>
		<EditOutline class="h-5 w-5" />
	</button>

	<button
		type="button"
		onclick={() => onDelete(factor)}
		class="rounded-full p-2 text-body-subtle hover:bg-c01 hover:text-red focus:outline-none focus:ring-2 focus:ring-c02"
		aria-label="Delete {factor.title}"
	>
		<TrashBinOutline class="h-5 w-5" />
	</button>
</li>
