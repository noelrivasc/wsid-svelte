<script lang="ts">
  import ScenarioFactorValuesForm from './ScenarioFactorValuesForm.svelte';
  import type { Factor, FactorsList, Scenario, ScenarioFactorValues } from '$lib/schemas';

  type Props = {
    scenario: Scenario;
    factors: FactorsList;
    factorsMap: Record<string, Factor>;
    values?: ScenarioFactorValues[string];
    onCancel: () => void;
    onSuccess?: () => void;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { scenario, factors, factorsMap, values, onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<ScenarioFactorValuesForm
  {scenario}
  {factors}
  {factorsMap}
  {values}
  {onCancel}
  {onSuccess}
  {mockSubmit}
/>
