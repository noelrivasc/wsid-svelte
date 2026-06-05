<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import WeightCircle from './WeightCircle.svelte';

  const { Story } = defineMeta({
    title: 'Components/Factors/WeightCircle',
    component: WeightCircle,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'A circular badge whose diameter scales with the factor weight (0–10). Used in `FactorRow` to convey relative importance at a glance.'
        }
      }
    }
  });
</script>

<Story name="Minimum (0)" args={{ weight: 0 }} />

<Story name="Middle (5)" args={{ weight: 5 }} />

<Story name="Maximum (10)" args={{ weight: 10 }} />
