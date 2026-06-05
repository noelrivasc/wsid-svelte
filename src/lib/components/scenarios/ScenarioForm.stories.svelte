<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import ScenarioFormAdd from './ScenarioFormAdd.svelte';
  import ScenarioFormEdit from './ScenarioFormEdit.svelte';
  import ScenarioFormDelete from './ScenarioFormDelete.svelte';
  import { formSampleScenario, formMinimalScenario } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Scenarios/ScenarioForm',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Form for creating or editing a scenario. Always consume via the `ScenarioFormAdd` or `ScenarioFormEdit` wrappers — they expose mode-specific prop shapes and keep call sites unambiguous. The underlying `ScenarioForm` is an implementation detail and should not be imported directly. In Storybook, pass `mockSubmit` to intercept submission.'
        }
      }
    }
  });
</script>

<Story name="ScenarioFormAdd">
  <ScenarioFormAdd mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="ScenarioFormEdit">
  <ScenarioFormEdit scenario={formSampleScenario} mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="ScenarioFormEdit: minimal">
  <ScenarioFormEdit scenario={formMinimalScenario} mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="ScenarioFormDelete">
  <ScenarioFormDelete scenario={formSampleScenario} mockSubmit={fn()} onCancel={fn()} />
</Story>
