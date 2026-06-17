<script lang="ts">
  import { EditOutline, ShareNodesOutline } from 'flowbite-svelte-icons';
  import type { DecisionMetadata } from '$lib/schemas';
  import type { Attachment } from 'svelte/attachments';

  type Props = {
    metadata: DecisionMetadata;
    readOnly?: boolean;
    onEdit?: () => void;
    onMakePublic?: () => void;
  };
  let { metadata, readOnly = false, onEdit, onMakePublic }: Props = $props();

  let descriptionExpanded = $state(false);
  const expandDescription: Attachment = (el) => {
    const text = el.querySelector('p.description');
    if (text && text?.scrollHeight > text?.clientHeight) {
      el.querySelector('.description-toggle-control')?.classList.remove('hidden');
    }
  };
</script>

<header class="flex items-start justify-between gap-4">
  <div class="min-w-0">
    <h1 class="text-2xl font-semibold text-heading">{metadata.title}</h1>
    {#if metadata.description}
      <div class="expandable" {@attach expandDescription}>
        <input
          bind:checked={descriptionExpanded}
          type="checkbox"
          id="description-toggle"
          class="description-toggle hidden"
        />
        <p
          class="mt-2 {descriptionExpanded
            ? 'max-h-1000'
            : 'max-h-48'} description max-w-150 overflow-hidden text-ellipsis whitespace-pre-line text-body-subtle transition-all duration-500 ease-in-out"
        >
          {metadata.description}
        </p>
        <label for="description-toggle" class="description-toggle-control hidden text-cta"
          >{descriptionExpanded ? '[- less]' : '[+ more]'}</label
        >
      </div>
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
