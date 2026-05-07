<script lang="ts">
	import { PlusOutline } from 'flowbite-svelte-icons';
	import type { Scenario, ScenariosList } from '$lib/schemas';
	import ScenarioRow from './ScenarioRow.svelte';

	type Props = {
		scenarios: ScenariosList;
		onAdd: () => void;
		onEdit: (scenario: Scenario) => void;
	};
	let { scenarios, onAdd, onEdit }: Props = $props();
</script>

<section>
	<header class="flex items-start justify-between gap-4">
		<div>
			<h2 class="text-2xl font-semibold text-heading">Scenarios</h2>
			<p class="mt-1 text-sm text-body-subtle">
				The options you're weighing. Each scenario is a candidate path you'll score against your
				factors.
			</p>
		</div>
		<button
			type="button"
			onclick={onAdd}
			class="flex shrink-0 items-center justify-center rounded-full bg-cta p-2 text-body-inverted hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-c02"
			aria-label="Add scenario"
		>
			<PlusOutline class="h-5 w-5" />
		</button>
	</header>

	{#if scenarios.length === 0}
		<p class="mt-6 text-sm text-body-subtle italic">No scenarios yet.</p>
	{:else}
		<ul class="mt-4">
			{#each scenarios as scenario (scenario.id ?? scenario.title)}
				<ScenarioRow {scenario} {onEdit} />
			{/each}
		</ul>
	{/if}
</section>
