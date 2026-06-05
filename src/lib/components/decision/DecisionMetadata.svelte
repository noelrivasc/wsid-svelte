<script lang="ts">
  import { EditOutline } from 'flowbite-svelte-icons';
  import type { DecisionMetadata } from '$lib/schemas';

  type Props = {
    metadata: DecisionMetadata;
    readOnly?: boolean;
    onEdit?: () => void;
  };
  let { metadata, readOnly = false, onEdit }: Props = $props();
</script>

<header class="flex items-start justify-between gap-4">
  <div class="min-w-0">
    <h1 class="text-3xl font-semibold text-heading">{metadata.title}</h1>
    {#if metadata.description}
      <p class="mt-2 whitespace-pre-line text-body-subtle">{metadata.description}</p>
    {/if}
  </div>
  {#if !readOnly}
    <button
      type="button"
      onclick={onEdit}
      class="flex shrink-0 items-center justify-center rounded-full bg-cta p-2 text-body-inverted hover:opacity-90 focus:ring-2 focus:ring-c02 focus:outline-none"
      aria-label="Edit decision"
    >
      <EditOutline class="h-5 w-5" />
    </button>
  {/if}
</header>
