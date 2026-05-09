<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
  import { resolve } from '$app/paths';
</script>

<h1 class="text-3xl font-semibold text-heading">Decisions</h1>

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
