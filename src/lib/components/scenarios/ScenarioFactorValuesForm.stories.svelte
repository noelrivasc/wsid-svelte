<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import ScenarioFactorValuesFormEdit from './ScenarioFactorValuesFormEdit.svelte';
  import { getFactorsMap } from '$lib/engine';
  import {
    coreFactors,
    stayScenario,
    indieScenario,
    sampleScenarioFactorValues
  } from '$lib/test_data';

  const factorsMap = getFactorsMap(coreFactors);

  const { Story } = defineMeta({
    title: 'Components/Scenarios/ScenarioFactorValuesForm',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Drawer form for setting a scenario’s value for each decision factor. Sliders are 0–10; the header shows the live total score and each row shows its weighted contribution, recomputed with the same formula as the canonical scorer. Submits all values as one batch (`scenarioFactorValue/setMultiple`). Consume via `ScenarioFactorValuesFormEdit`. In Storybook, pass `mockSubmit` to intercept submission.'
        }
      }
    }
  });
</script>

<Story name="Edit values">
  <ScenarioFactorValuesFormEdit
    scenario={stayScenario}
    factors={coreFactors}
    {factorsMap}
    values={sampleScenarioFactorValues[stayScenario.id]}
    mockSubmit={fn()}
    onCancel={fn()}
  />
</Story>

<Story name="Edit values: unset (no prior values)">
  <ScenarioFactorValuesFormEdit
    scenario={indieScenario}
    factors={coreFactors}
    {factorsMap}
    mockSubmit={fn()}
    onCancel={fn()}
  />
</Story>
