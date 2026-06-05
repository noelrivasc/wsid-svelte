<script lang="ts">
  import DecisionMetadataFormAdd from './DecisionMetadataFormAdd.svelte';

  type Props = {
    onCancel: () => void;
    onSuccess: () => void;
    // mockSubmit intercepts submission, cancels network call, to test actions in Storybook
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<DecisionMetadataFormAdd {onCancel} {onSuccess} {mockSubmit} />
