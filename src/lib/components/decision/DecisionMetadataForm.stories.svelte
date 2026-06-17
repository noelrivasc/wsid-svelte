<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import DecisionMetadataFormAdd from './DecisionMetadataFormAdd.svelte';
  import DecisionMetadataFormEdit from './DecisionMetadataFormEdit.svelte';
  import { longMetadata, shortMetadata, minimalMetadata } from '$lib/test_data';

  const { Story } = defineMeta({
    title: 'Components/Decision/DecisionMetadataForm',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            "Form for creating or editing a decision's metadata (title and description). Always consume via the `DecisionMetadataFormAdd` or `DecisionMetadataFormEdit` wrappers — they expose mode-specific prop shapes and keep call sites unambiguous. The underlying `DecisionMetadataForm` is an implementation detail and should not be imported directly. In Storybook, pass `mockSubmit` to intercept submission and inspect the form data via the Actions panel."
        }
      }
    }
  });
</script>

<Story name="DecisionMetadataFormAdd">
  <DecisionMetadataFormAdd mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="DecisionMetadataFormEdit">
  <DecisionMetadataFormEdit metadata={shortMetadata} mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="DecisionMetadataFormEdit: minimal">
  <DecisionMetadataFormEdit metadata={minimalMetadata} mockSubmit={fn()} onCancel={fn()} />
</Story>
