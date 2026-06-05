<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
  import { resolve } from '$app/paths';
  import { PlusOutline } from 'flowbite-svelte-icons';
</script>

<div class="flex items-center justify-between">
  <h1 class="text-3xl font-semibold text-heading">Decisions</h1>
  <a
    href={resolve('/decisions/new')}
    class="flex shrink-0 items-center justify-center gap-2 rounded-full bg-cta px-4 py-2 text-body-inverted hover:opacity-90 focus:ring-2 focus:ring-c02 focus:outline-none"
  >
    New decision
    <PlusOutline class="h-5 w-5" />
  </a>
</div>

{#if data.decisions.length === 0}
  <p class="mt-2 text-body-subtle">No decisions yet.</p>
{:else}
  <ul class="mt-4 space-y-2">
    {#each data.decisions as d (d.id)}
      <li>
        <a class="text-cta hover:underline" href={resolve(`/decisions/${d.id}`)}>{d.title}</a>
      </li>
    {/each}
  </ul>
{/if}
