<script lang="ts">
  import { untrack } from 'svelte';
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Checkbox, Button } from 'flowbite-svelte';

  type Props = {
    isPublic?: boolean;
    onCancel: () => void;
    onSuccess?: () => void;
    // mockSubmit intercepts submission, cancels network call, to test actions in Storybook
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { isPublic = false, onCancel, onSuccess, mockSubmit }: Props = $props();

  let checked = $state(untrack(() => isPublic));

  const submit: SubmitFunction = ({ formData, cancel }) => {
    if (mockSubmit) {
      mockSubmit(Object.fromEntries(formData));
      cancel();
      return;
    }
    return async ({ result, update }) => {
      await update();
      if (result.type === 'success') onSuccess?.();
    };
  };
</script>

<form
  method="POST"
  action="?/setPublicStatus"
  use:enhance={submit}
  class="flex flex-col gap-4"
  novalidate
>
  <Checkbox name="isPublic" bind:checked>Share with the world.</Checkbox>

  <p class="text-sm text-body-subtle">
    This will let others see your decision and its history. You can always unshare it later.
  </p>

  <div class="mt-2 flex items-center justify-end gap-2">
    <Button
      type="button"
      outline
      class="border-c03 text-body hover:text-body/90 focus:ring-c01"
      onclick={onCancel}>Cancel</Button
    >
    <Button type="submit" class="bg-cta text-body-inverted hover:bg-cta/90 focus:ring-c01">
      Save
    </Button>
  </div>
</form>
