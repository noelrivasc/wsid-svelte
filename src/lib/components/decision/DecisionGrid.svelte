<script lang="ts">
  import type { FactorsList, ScenariosList, ScenarioFactorValues } from '$lib/schemas';
  import { getFactorsMap } from '$lib/engine/derived';
  import { Tooltip } from 'flowbite-svelte';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';

  type Props = {
    factors: FactorsList;
    scenarios: ScenariosList;
    scenarioFactorValues: ScenarioFactorValues;
  };
  let { factors, scenarios, scenarioFactorValues }: Props = $props();
  const factorsMap = $derived(getFactorsMap(factors));

  function cellValue(
    scenarioId: string | undefined,
    factorId: string | undefined
  ): Record<string, number | null> | null {
    if (!scenarioId || !factorId) return null;
    const val = scenarioFactorValues[scenarioId]?.[factorId] ?? null;
    const factorWeight = factorsMap[factorId].weight;

    return {
      points: val,
      score: (val ?? 0) * factorWeight,
      factorWeight
    };
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
              <th class="px-3 py-2 text-left font-semibold text-body">
                {scenario.title}<br />
                <span class="text-xs text-accent-green uppercase">
                  score: {Number.isInteger(scenario.score) ? scenario.score : ''}
                </span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each factors as factor (factor.id ?? factor.title)}
            <tr class="border-b border-c01 last:border-b-0">
              <th class="px-3 py-2 text-left font-medium text-body" scope="row">
                <span class="block">{factor.title}</span>
                <span class="text-xs text-c04 uppercase">weight {factor.weight}</span>
              </th>
              {#each scenarios as scenario (scenario.id ?? scenario.title)}
                {@const v = cellValue(scenario.id, factor.id)}
                <td class="px-3 py-2 text-body-subtle tabular-nums">
                  {#if v !== null}
                    {@const tooltipId = `info-${scenario.id}-${factor.id}`}
                    <span class="text-body">{v.score}</span>
                    <InfoCircleSolid
                      id={tooltipId}
                      class="ml-2 inline-block h-4 w-4 cursor-pointer "
                    />
                    <Tooltip class="bg-c07" triggeredBy="#{tooltipId}" trigger="click">
                      {#if v.points === null}
                        This scenario hasn't been rated for this factor. Perhaps go give it some
                        points?
                      {:else}
                        <div class="font-mono text-xs text-c02">
                          (scenario points) * (factor weight)<br />
                          ({v.points}) * ({v.factorWeight})<br />
                          <span class="text-c01">= {v.score}</span>
                        </div>
                      {/if}
                    </Tooltip>
                  {:else}
                    —
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>
