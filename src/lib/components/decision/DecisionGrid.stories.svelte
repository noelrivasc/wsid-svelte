<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DecisionGrid from './DecisionGrid.svelte';
  import { coreFactors, sampleScenarios, sampleScenarioFactorValues } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Decision/DecisionGrid',
    component: DecisionGrid,
    tags: ['autodocs'],
    args: {
      factors: coreFactors,
      scenarios: sampleScenarios,
      scenarioFactorValues: sampleScenarioFactorValues
    }
  });
</script>

<Story name="Default" />

<Story name="Empty" args={{ factors: [], scenarios: [], scenarioFactorValues: {} }} />
