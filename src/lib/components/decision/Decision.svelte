<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	import type { Decision, Factor, Scenario } from '$lib/schemas';
	import DecisionMetadata from './DecisionMetadata.svelte';
	import DecisionGrid from './DecisionGrid.svelte';
	import FactorsList from '$lib/components/factors/FactorsList.svelte';
	import ScenariosList from '$lib/components/scenarios/ScenariosList.svelte';

	type ViewMode = 'full' | 'grid' | 'factors' | 'scenarios';

	type Props = {
		decision: Decision;
		onEditMetadata: () => void;
		onAddFactor: () => void;
		onEditFactor: (factor: Factor) => void;
		onDeleteFactor: (factor: Factor) => void;
		onAddScenario: () => void;
		onEditScenario: (scenario: Scenario) => void;
	};
	let {
		decision,
		onEditMetadata,
		onAddFactor,
		onEditFactor,
		onDeleteFactor,
		onAddScenario,
		onEditScenario
	}: Props = $props();

	let viewMode = $state<ViewMode>('full');

	const viewModeItems = [
		{ value: 'full', name: 'Full' },
		{ value: 'grid', name: 'Grid' },
		{ value: 'factors', name: 'Factors' },
		{ value: 'scenarios', name: 'Scenarios' }
	];

	const showFactors = $derived(viewMode === 'full' || viewMode === 'factors');
	const showScenarios = $derived(viewMode === 'full' || viewMode === 'scenarios');
	const showGrid = $derived(viewMode === 'grid');
</script>

<article class="flex flex-col gap-8">
	<DecisionMetadata metadata={decision.metadata} onEdit={onEditMetadata} />

	<Label class="max-w-xs space-y-2">
		<span>View mode</span>
		<Select items={viewModeItems} bind:value={viewMode} />
	</Label>

	{#if showFactors}
		<FactorsList
			factors={decision.factors}
			onAdd={onAddFactor}
			onEdit={onEditFactor}
			onDelete={onDeleteFactor}
		/>
	{/if}

	{#if showScenarios}
		<ScenariosList scenarios={decision.scenarios} onAdd={onAddScenario} onEdit={onEditScenario} />
	{/if}

	{#if showGrid}
		<DecisionGrid
			factors={decision.factors}
			scenarios={decision.scenarios}
			scenarioFactorValues={decision.scenarioFactorValues}
		/>
	{/if}
</article>
