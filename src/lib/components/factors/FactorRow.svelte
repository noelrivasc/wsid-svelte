<script lang="ts">
  import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import type { Factor } from '$lib/schemas';
  import WeightCircle from './WeightCircle.svelte';

  type Props = {
    factor: Factor;
    readOnly?: boolean;
    onEdit?: (factor: Factor) => void;
    onDelete?: (factor: Factor) => void;
  };
  let { factor, readOnly = false, onEdit, onDelete }: Props = $props();

  const gridCols = $derived(readOnly ? 'grid-cols-[56px_1fr]' : 'grid-cols-[56px_1fr_auto_auto]');
</script>

<li class="grid {gridCols} items-center gap-2 border-b border-c01 py-3 last:border-b-0">
  <div class="flex justify-center">
    <WeightCircle weight={factor.weight} />
  </div>

  <div class="min-w-0">
    <p class="truncate text-base font-semibold text-body">{factor.title}</p>
    {#if factor.description}
      <p class="truncate text-sm text-body-subtle">{factor.description}</p>
    {/if}
  </div>

  {#if !readOnly}
    <button
      type="button"
      onclick={() => onEdit?.(factor)}
      class="rounded-full p-2 text-body-subtle hover:bg-c01 hover:text-body focus:ring-2 focus:ring-c02 focus:outline-none"
      aria-label="Edit {factor.title}"
    >
      <EditOutline class="h-5 w-5" />
    </button>

    <button
      type="button"
      onclick={() => onDelete?.(factor)}
      class="hover:text-red rounded-full p-2 text-body-subtle hover:bg-c01 focus:ring-2 focus:ring-c02 focus:outline-none"
      aria-label="Delete {factor.title}"
    >
      <TrashBinOutline class="h-5 w-5" />
    </button>
  {/if}
</li>
