<script lang="ts">
  import FactorForm from './FactorForm.svelte';

  type Props = {
    onCancel: () => void;
    onSuccess?: () => void;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<FactorForm action="?/addFactor" submitLabel="Add" {onCancel} {onSuccess} {mockSubmit} />
