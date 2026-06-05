<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import DecisionMetadata from './DecisionMetadata.svelte';
  import { sampleMetadata, minimalMetadata } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Decision/DecisionMetadata',
    component: DecisionMetadata,
    tags: ['autodocs'],
    args: {
      onEdit: fn()
    }
  });
</script>

<Story name="Default" args={{ metadata: sampleMetadata }} />

<Story name="TitleOnly" args={{ metadata: minimalMetadata }} />
