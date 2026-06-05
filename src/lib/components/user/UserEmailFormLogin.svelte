<script lang="ts">
  import { resolve } from '$app/paths';
  import UserEmailForm from './UserEmailForm.svelte';

  type Props = {
    onSuccess?: () => void;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { onSuccess, mockSubmit }: Props = $props();
</script>

<UserEmailForm submitLabel="Send me a login link" {onSuccess} {mockSubmit}>
  {#snippet footer()}
    No account yet?
    <a href={resolve('/users/register')} class="text-cta hover:underline">Sign up</a>.
  {/snippet}
</UserEmailForm>
