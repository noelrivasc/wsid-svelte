<script lang="ts">
  import FactorForm from './FactorForm.svelte';
  import type { Factor } from '$lib/schemas';

  type Props = {
    factor: Factor;
    onCancel: () => void;
    onSuccess?: () => void;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { factor, onCancel, onSuccess, mockSubmit }: Props = $props();
</script>

<div class="flex flex-col gap-6">
  <FactorForm
    action="?/editFactor"
    initial={factor}
    submitLabel="Save"
    {onCancel}
    {onSuccess}
    {mockSubmit}
  />
</div>
