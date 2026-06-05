<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from 'storybook/test';
  import DecisionPublishForm from './DecisionPublishForm.svelte';

  const { Story } = defineMeta({
    title: 'Components/Decision/DecisionPublishForm',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            "Form for toggling a decision's public status. A public decision is viewable read-only by anyone with the link. The `isPublic` prop seeds the checkbox. In Storybook, pass `mockSubmit` to intercept submission and inspect the form data via the Actions panel."
        }
      }
    }
  });
</script>

<Story name="DecisionPublishForm: private">
  <DecisionPublishForm isPublic={false} mockSubmit={fn()} onCancel={fn()} />
</Story>

<Story name="DecisionPublishForm: public">
  <DecisionPublishForm isPublic={true} mockSubmit={fn()} onCancel={fn()} />
</Story>
