<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button } from 'flowbite-svelte';

  type Props = {
    email: string;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { email, mockSubmit }: Props = $props();

  const submit: SubmitFunction = ({ formData, cancel }) => {
    if (mockSubmit) {
      mockSubmit(Object.fromEntries(formData));
      cancel();
      return;
    }
  };
</script>

<p>Signed in as <strong>{email}</strong>.</p>
