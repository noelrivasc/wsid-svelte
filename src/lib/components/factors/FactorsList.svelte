<script lang="ts">
  import { PlusOutline } from 'flowbite-svelte-icons';
  import type { Factor, FactorsList } from '$lib/schemas';
  import FactorRow from './FactorRow.svelte';

  type Props = {
    factors: FactorsList;
    readOnly?: boolean;
    onAdd?: () => void;
    onEdit?: (factor: Factor) => void;
    onDelete?: (factor: Factor) => void;
  };
  let { factors, readOnly = false, onAdd, onEdit, onDelete }: Props = $props();
</script>

<section>
  <header class="flex items-start justify-between gap-4">
    <div>
      <h2 class="text-2xl font-semibold text-heading">Factors</h2>
      <p class="mt-1 text-sm text-body-subtle">
        Reasons the decision matters to you. Each factor's weight tunes how much it sways the
        outcome relative to the others.
      </p>
    </div>
    {#if !readOnly}
      <button
        type="button"
        onclick={onAdd}
        class="flex shrink-0 items-center justify-center rounded-full bg-cta p-2 text-body-inverted hover:opacity-90 focus:ring-2 focus:ring-c02 focus:outline-none"
        aria-label="Add factor"
      >
        <PlusOutline class="h-5 w-5" />
      </button>
    {/if}
  </header>

  {#if factors.length === 0}
    <p class="mt-6 text-sm text-body-subtle italic">No factors yet.</p>
  {:else}
    <ul class="mt-4">
      {#each factors as factor (factor.id ?? factor.title)}
        <FactorRow {factor} {readOnly} {onEdit} {onDelete} />
      {/each}
    </ul>
  {/if}
</section>
