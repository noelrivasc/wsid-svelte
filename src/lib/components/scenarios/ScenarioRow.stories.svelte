<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import ScenarioRow from './ScenarioRow.svelte';
  import { stayScenario, indieScenario } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Scenarios/ScenarioRow',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'A single scenario row: title/description and edit/delete actions. Renders an `<li>`, so it is shown inside a `<ul>` here. Pass `readOnly` to hide the action buttons.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ul>
    <ScenarioRow scenario={stayScenario} onEdit={fn()} onDelete={fn()} />
  </ul>
</Story>

<Story name="Read-only">
  <ul>
    <ScenarioRow scenario={stayScenario} readOnly />
  </ul>
</Story>

<Story name="No description">
  <ul>
    <ScenarioRow scenario={indieScenario} onEdit={fn()} onDelete={fn()} />
  </ul>
</Story>
