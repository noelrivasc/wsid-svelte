<script lang="ts">
	import { EditOutline } from 'flowbite-svelte-icons';
	import type { DecisionMetadata } from '$lib/schemas';

	type Props = {
		metadata: DecisionMetadata;
		onEdit: () => void;
	};
	let { metadata, onEdit }: Props = $props();
</script>

<header class="flex items-start justify-between gap-4">
	<div class="min-w-0">
		<h1 class="text-3xl font-semibold text-heading">{metadata.title}</h1>
		{#if metadata.description}
			<p class="mt-2 whitespace-pre-line text-body-subtle">{metadata.description}</p>
		{/if}
	</div>
	<button
		type="button"
		onclick={onEdit}
		class="flex shrink-0 items-center justify-center rounded-full bg-cta p-2 text-body-inverted hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-c02"
		aria-label="Edit decision"
	>
		<EditOutline class="h-5 w-5" />
	</button>
</header>
