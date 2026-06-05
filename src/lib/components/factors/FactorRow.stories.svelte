<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import FactorRow from './FactorRow.svelte';
  import { salaryFactor, techStackFactor } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Factors/FactorRow',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'A single factor row: weight circle, title/description, and edit/delete actions. Renders an `<li>`, so it is shown inside a `<ul>` here. Pass `readOnly` to hide the action buttons.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ul>
    <FactorRow factor={salaryFactor} onEdit={fn()} onDelete={fn()} />
  </ul>
</Story>

<Story name="Read-only">
  <ul>
    <FactorRow factor={salaryFactor} readOnly />
  </ul>
</Story>

<Story name="No description">
  <ul>
    <FactorRow factor={techStackFactor} onEdit={fn()} onDelete={fn()} />
  </ul>
</Story>
