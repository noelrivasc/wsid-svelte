<script lang="ts">
  import { resolve } from '$app/paths';
  import { BrainOutline } from 'flowbite-svelte-icons';
  import type { PageProps } from './$types';

  // `user` comes from the root layout load and merges into page data.
  let { data }: PageProps = $props();
</script>

<section class="flex flex-col items-center gap-8 py-8 md:flex-row md:gap-12 md:py-16">
  <div class="flex-1">
    <h1 class="text-4xl font-semibold text-heading md:text-5xl">What should I do?</h1>
    <p class="mt-4 text-lg text-body">
      WSID is a small tool for thinking through a hard decision on purpose. Lay out the scenarios
      you're weighing, name the factors that actually matter, and see where they point.
    </p>
    <p class="mt-3 text-body-subtle">
      Every change is recorded, so you can look back and trace how your thinking shifted — not just
      where it landed.
    </p>

    <div class="mt-8 flex flex-wrap items-center gap-4">
      {#if data.user}
        <a
          href={resolve('/decisions')}
          class="rounded-lg bg-cta px-5 py-2.5 font-medium text-body-inverted hover:opacity-90"
        >
          Go to your decisions
        </a>
      {:else}
        <a
          href={resolve('/users/register')}
          class="rounded-lg bg-cta px-5 py-2.5 font-medium text-body-inverted hover:opacity-90"
        >
          Get started
        </a>
        <a href={resolve('/users/login')} class="font-medium text-cta hover:underline"> Log in </a>
      {/if}
    </div>
  </div>

  <!-- Hero illustration TBD (possibly Absurd illustrations); placeholder for now. -->
  <div class="flex flex-1 justify-center" aria-hidden="true">
    <BrainOutline class="h-48 w-48 text-c02 md:h-64 md:w-64" />
  </div>
</section>
