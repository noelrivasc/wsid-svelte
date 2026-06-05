<script lang="ts">
  import DecisionMetadataForm from './DecisionMetadataForm.svelte';

  type Props = {
    onCancel: () => void;
    onSuccess?: () => void;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<DecisionMetadataForm
  action="?/addDecision"
  submitLabel="Add"
  {onCancel}
  {onSuccess}
  {mockSubmit}
/>
