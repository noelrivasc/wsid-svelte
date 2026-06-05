<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button } from 'flowbite-svelte';
  import type { Scenario } from '$lib/schemas';

  type Props = {
    scenario: Scenario;
    onCancel: () => void;
    onSuccess?: () => void;
    // mockSubmit intercepts submission, cancels network call, to test actions in Storybook
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { scenario, onCancel, onSuccess, mockSubmit }: Props = $props();

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

<form method="POST" action="?/deleteScenario" use:enhance={submit} class="flex flex-col gap-4">
  <input type="hidden" name="id" value={scenario.id} />

  <p class="text-body">
    Are you sure you want to delete scenario <span class="font-semibold">{scenario.title}</span>?
  </p>
  <p class="text-sm text-body-subtle">This action cannot be undone.</p>

  <div class="mt-2 flex items-center justify-end gap-2">
    <Button
      type="button"
      outline
      class="border-c03 text-body hover:text-body/90 focus:ring-c01"
      onclick={onCancel}>Cancel</Button
    >
    <Button type="submit" class="bg-cta text-body-inverted hover:bg-cta/90 focus:ring-c01">
      Delete
    </Button>
  </div>
</form>
