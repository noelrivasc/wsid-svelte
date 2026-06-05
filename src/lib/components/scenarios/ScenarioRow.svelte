<script lang="ts">
  import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import type { Scenario } from '$lib/schemas';

  type Props = {
    scenario: Scenario;
    readOnly?: boolean;
    onEdit?: (scenario: Scenario) => void;
    onDelete?: (scenario: Scenario) => void;
  };
  let { scenario, readOnly = false, onEdit, onDelete }: Props = $props();

  const gridCols = $derived(readOnly ? 'grid-cols-[1fr]' : 'grid-cols-[1fr_auto_auto]');
</script>

<li class="grid {gridCols} items-center gap-2 border-b border-c01 py-3 last:border-b-0">
  <div class="min-w-0">
    <p class="truncate text-base font-semibold text-body">{scenario.title}</p>
    {#if scenario.description}
      <p class="truncate text-sm text-body-subtle">{scenario.description}</p>
    {/if}
  </div>

  {#if !readOnly}
    <button
      type="button"
      onclick={() => onEdit?.(scenario)}
      class="rounded-full p-2 text-body-subtle hover:bg-c01 hover:text-body focus:ring-2 focus:ring-c02 focus:outline-none"
      aria-label="Edit {scenario.title}"
    >
      <EditOutline class="h-5 w-5" />
    </button>

    <button
      type="button"
      onclick={() => onDelete?.(scenario)}
      class="hover:text-red rounded-full p-2 text-body-subtle hover:bg-c01 focus:ring-2 focus:ring-c02 focus:outline-none"
      aria-label="Delete {scenario.title}"
    >
      <TrashBinOutline class="h-5 w-5" />
    </button>
  {/if}
</li>
