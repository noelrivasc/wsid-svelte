<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button } from 'flowbite-svelte';

  type Props = {
    token: string;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { token, mockSubmit }: Props = $props();

  const submit: SubmitFunction = ({ formData, cancel }) => {
    if (mockSubmit) {
      mockSubmit(Object.fromEntries(formData));
      cancel();
      return;
    }
  };
</script>

<form class="my-4 flex max-w-96 flex-col gap-4" method="POST" use:enhance={submit}>
  <input type="hidden" name="token" value={token} />
  <p class="text-body-subtle">Click below to complete your login.</p>
  <Button type="submit" class="bg-cta text-body-inverted hover:bg-cta/90 focus:ring-c01">
    Log in
  </Button>
</form>
