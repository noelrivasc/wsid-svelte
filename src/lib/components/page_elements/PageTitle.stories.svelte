<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PageTitle from '$lib/components/page_elements/PageTitle.svelte';

  const { Story } = defineMeta({
    title: 'Components/PageElements/PageTitle',
    component: PageTitle,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' }
    },
    args: {
      title: 'Sample title'
    }
  });
</script>

<Story name="Sample" />
