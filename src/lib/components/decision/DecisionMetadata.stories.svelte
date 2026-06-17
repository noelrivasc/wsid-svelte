<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import DecisionMetadata from './DecisionMetadata.svelte';
  import { longMetadata, shortMetadata, minimalMetadata } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Decision/DecisionMetadata',
    component: DecisionMetadata,
    tags: ['autodocs'],
    args: {
      onEdit: fn()
    }
  });
</script>

<Story name="TitleOnly" args={{ metadata: minimalMetadata }} />

<Story name="Default" args={{ metadata: shortMetadata }} />

<Story name="LongDescription" args={{ metadata: longMetadata }} />
