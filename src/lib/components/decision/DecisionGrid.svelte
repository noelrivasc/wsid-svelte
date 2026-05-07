<script lang="ts">
	import type { Factors, ScenariosList, ScenarioFactorValues } from '$lib/schemas';

	type Props = {
		factors: Factors;
		scenarios: ScenariosList;
		scenarioFactorValues: ScenarioFactorValues;
	};
	let { factors, scenarios, scenarioFactorValues }: Props = $props();

	function cellValue(scenarioId: string | undefined, factorId: string | undefined) {
		if (!scenarioId || !factorId) return null;
		return scenarioFactorValues[scenarioId]?.[factorId] ?? null;
	}
</script>

<section>
	<h2 class="text-2xl font-semibold text-heading">Grid</h2>
	<p class="mt-1 text-sm text-body-subtle">
		Factor weights for each scenario. Rows are factors, columns are scenarios.
	</p>
	{#if factors.length === 0 || scenarios.length === 0}
		<p class="mt-6 text-sm text-body-subtle italic">
			Add at least one factor and one scenario to see the grid.
		</p>
	{:else}
		<div class="mt-4 overflow-x-auto">
			<table class="min-w-full border-collapse text-sm">
				<thead>
					<tr class="border-b border-c01">
						<th class="px-3 py-2 text-left font-semibold text-body">Factor</th>
						{#each scenarios as scenario (scenario.id ?? scenario.title)}
							<th class="px-3 py-2 text-left font-semibold text-body">{scenario.title}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each factors as factor (factor.id ?? factor.title)}
						<tr class="border-b border-c01 last:border-b-0">
							<th class="px-3 py-2 text-left font-medium text-body" scope="row">
								<span class="block">{factor.title}</span>
								<span class="text-xs text-body-subtle">weight {factor.weight}</span>
							</th>
							{#each scenarios as scenario (scenario.id ?? scenario.title)}
								{@const v = cellValue(scenario.id, factor.id)}
								<td class="px-3 py-2 tabular-nums text-body">
									{v === null ? '—' : v}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>
