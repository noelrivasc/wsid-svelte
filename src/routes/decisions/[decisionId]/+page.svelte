<script lang="ts">
  import type { PageProps } from './$types';
  import { Drawer } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
  import Decision from '$lib/components/decision/Decision.svelte';
  import DecisionMetadataFormEdit from '$lib/components/decision/DecisionMetadataFormEdit.svelte';
  import DecisionPublishForm from '$lib/components/decision/DecisionPublishForm.svelte';
  import FactorFormAdd from '$lib/components/factors/FactorFormAdd.svelte';
  import FactorFormEdit from '$lib/components/factors/FactorFormEdit.svelte';
  import FactorFormDelete from '$lib/components/factors/FactorFormDelete.svelte';
  import ScenarioFormAdd from '$lib/components/scenarios/ScenarioFormAdd.svelte';
  import ScenarioFormEdit from '$lib/components/scenarios/ScenarioFormEdit.svelte';
  import ScenarioFormDelete from '$lib/components/scenarios/ScenarioFormDelete.svelte';
  import ScenarioFactorValuesFormEdit from '$lib/components/scenarios/ScenarioFactorValuesFormEdit.svelte';
  import { getFactorsMap } from '$lib/engine';
  import type { Factor, Scenario } from '$lib/schemas';

  let { data }: PageProps = $props();

  let editMetadataOpen = $state(false);
  let makePublicOpen = $state(false);
  let addFactorOpen = $state(false);
  let editFactorOpen = $state(false);
  let deleteFactorOpen = $state(false);
  let factorBeingEdited = $state<Factor | null>(null);
  let factorBeingDeleted = $state<Factor | null>(null);

  let addScenarioOpen = $state(false);
  let editScenarioValuesOpen = $state(false);
  let editScenarioOpen = $state(false);
  let deleteScenarioOpen = $state(false);
  let scenarioBeingValued = $state<Scenario | null>(null);
  let scenarioBeingEdited = $state<Scenario | null>(null);
  let scenarioBeingDeleted = $state<Scenario | null>(null);

  const transitionParams = { x: 320, duration: 200, easing: sineIn };

  const factorsMap = $derived(getFactorsMap(data.decision.factors));

  function openEditFactor(factor: Factor) {
    factorBeingEdited = factor;
    editFactorOpen = true;
  }

  function openDeleteFactor(factor: Factor) {
    factorBeingDeleted = factor;
    deleteFactorOpen = true;
  }

  function openEditScenarioValues(scenario: Scenario) {
    scenarioBeingValued = scenario;
    editScenarioValuesOpen = true;
  }

  function openEditScenario(scenario: Scenario) {
    scenarioBeingEdited = scenario;
    editScenarioOpen = true;
  }

  function openDeleteScenario(scenario: Scenario) {
    scenarioBeingDeleted = scenario;
    deleteScenarioOpen = true;
  }
</script>

<Decision
  decision={data.decision}
  readOnly={data.readOnly}
  onEditMetadata={() => (editMetadataOpen = true)}
  onMakePublic={() => (makePublicOpen = true)}
  onAddFactor={() => (addFactorOpen = true)}
  onEditFactor={openEditFactor}
  onDeleteFactor={openDeleteFactor}
  onAddScenario={() => (addScenarioOpen = true)}
  onEditScenarioValues={openEditScenarioValues}
  onEditScenario={openEditScenario}
  onDeleteScenario={openDeleteScenario}
/>

{#if !data.readOnly}
  <Drawer
    bind:open={makePublicOpen}
    placement="right"
    {transitionParams}
    class="w-full max-w-md p-6"
  >
    <h2 class="mb-4 text-xl font-semibold text-heading">Make public</h2>
    <DecisionPublishForm
      isPublic={data.isPublic}
      onCancel={() => (makePublicOpen = false)}
      onSuccess={() => (makePublicOpen = false)}
    />
  </Drawer>
{/if}

<Drawer
  bind:open={editMetadataOpen}
  placement="right"
  {transitionParams}
  class="w-full max-w-md p-6"
>
  <h2 class="mb-4 text-xl font-semibold text-heading">Edit decision</h2>
  <DecisionMetadataFormEdit
    metadata={data.decision.metadata}
    onCancel={() => (editMetadataOpen = false)}
    onSuccess={() => (editMetadataOpen = false)}
  />
</Drawer>

<Drawer bind:open={addFactorOpen} placement="right" {transitionParams} class="w-full max-w-md p-6">
  <h2 class="mb-4 text-xl font-semibold text-heading">Add factor</h2>
  <FactorFormAdd
    onCancel={() => (addFactorOpen = false)}
    onSuccess={() => (addFactorOpen = false)}
  />
</Drawer>

<Drawer bind:open={editFactorOpen} placement="right" {transitionParams} class="w-full max-w-md p-6">
  <h2 class="mb-4 text-xl font-semibold text-heading">Edit factor</h2>
  {#if factorBeingEdited}
    <FactorFormEdit
      factor={factorBeingEdited}
      onCancel={() => (editFactorOpen = false)}
      onSuccess={() => (editFactorOpen = false)}
    />
  {/if}
</Drawer>

<Drawer
  bind:open={deleteFactorOpen}
  placement="right"
  {transitionParams}
  class="w-full max-w-md p-6"
>
  <h2 class="mb-4 text-xl font-semibold text-heading">Delete factor</h2>
  {#if factorBeingDeleted}
    <FactorFormDelete
      factor={factorBeingDeleted}
      onCancel={() => (deleteFactorOpen = false)}
      onSuccess={() => (deleteFactorOpen = false)}
    />
  {/if}
</Drawer>

<Drawer
  bind:open={addScenarioOpen}
  placement="right"
  {transitionParams}
  class="w-full max-w-md p-6"
>
  <h2 class="mb-4 text-xl font-semibold text-heading">Add scenario</h2>
  <ScenarioFormAdd
    onCancel={() => (addScenarioOpen = false)}
    onSuccess={() => (addScenarioOpen = false)}
  />
</Drawer>

<Drawer
  bind:open={editScenarioValuesOpen}
  placement="right"
  {transitionParams}
  class="w-full max-w-md p-6"
>
  <h2 class="mb-4 text-xl font-semibold text-heading">
    Decision factors{scenarioBeingValued ? `: ${scenarioBeingValued.title}` : ''}
  </h2>
  {#if scenarioBeingValued}
    <ScenarioFactorValuesFormEdit
      scenario={scenarioBeingValued}
      factors={data.decision.factors}
      {factorsMap}
      values={data.decision.scenarioFactorValues[scenarioBeingValued.id]}
      onCancel={() => (editScenarioValuesOpen = false)}
      onSuccess={() => (editScenarioValuesOpen = false)}
    />
  {/if}
</Drawer>

<Drawer
  bind:open={editScenarioOpen}
  placement="right"
  {transitionParams}
  class="w-full max-w-md p-6"
>
  <h2 class="mb-4 text-xl font-semibold text-heading">Edit scenario</h2>
  {#if scenarioBeingEdited}
    <ScenarioFormEdit
      scenario={scenarioBeingEdited}
      onCancel={() => (editScenarioOpen = false)}
      onSuccess={() => (editScenarioOpen = false)}
    />
  {/if}
</Drawer>

<Drawer
  bind:open={deleteScenarioOpen}
  placement="right"
  {transitionParams}
  class="w-full max-w-md p-6"
>
  <h2 class="mb-4 text-xl font-semibold text-heading">Delete scenario</h2>
  {#if scenarioBeingDeleted}
    <ScenarioFormDelete
      scenario={scenarioBeingDeleted}
      onCancel={() => (deleteScenarioOpen = false)}
      onSuccess={() => (deleteScenarioOpen = false)}
    />
  {/if}
</Drawer>
