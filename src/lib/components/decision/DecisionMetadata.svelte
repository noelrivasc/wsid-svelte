<script lang="ts">
  import { EditOutline, ShareNodesOutline } from 'flowbite-svelte-icons';
  import type { DecisionMetadata } from '$lib/schemas';

  type Props = {
    metadata: DecisionMetadata;
    readOnly?: boolean;
    onEdit?: () => void;
    onMakePublic?: () => void;
  };
  let { metadata, readOnly = false, onEdit, onMakePublic }: Props = $props();
</script>

<header class="flex items-start justify-between gap-4">
  <div class="min-w-0">
    <h1 class="text-3xl font-semibold text-heading">{metadata.title}</h1>
    {#if metadata.description}
      <p class="mt-2 whitespace-pre-line text-body-subtle">{metadata.description}</p>
    {/if}
  </div>
  {#if !readOnly}
    <div class="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onclick={onMakePublic}
        class="flex shrink-0 items-center justify-center rounded-full bg-cta p-2 text-sm text-body-inverted hover:opacity-90 focus:ring-2 focus:ring-c02 focus:outline-none"
        aria-label="Make decision public"
      >
        Share
        <ShareNodesOutline class="ml-2 h-4 w-4" />
      </button>
      <button
        type="button"
        onclick={onEdit}
        class="flex shrink-0 items-center justify-center rounded-full bg-cta p-2 text-sm text-body-inverted hover:opacity-90 focus:ring-2 focus:ring-c02 focus:outline-none"
        aria-label="Edit decision"
      >
        Edit
        <EditOutline class="ml-2 h-4 w-4" />
      </button>
    </div>
  {/if}
</header>
