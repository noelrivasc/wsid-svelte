<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import type { Snippet } from 'svelte';
  import { Label, Input, Button } from 'flowbite-svelte';

  type Props = {
    action?: string;
    submitLabel: string;
    onSuccess?: () => void;
    footer: Snippet;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { action = '', submitLabel, footer, onSuccess, mockSubmit }: Props = $props();

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

<form method="POST" {action} use:enhance={submit} class="flex flex-col gap-4">
  <Label class="space-y-2">
    <span>Email</span>
    <Input type="email" name="email" required autocomplete="email" placeholder="you@example.com" />
  </Label>

  <Button type="submit" class="bg-cta text-body-inverted hover:bg-cta/90 focus:ring-c01">
    {submitLabel}
  </Button>

  <p>{@render footer()}</p>
</form>
