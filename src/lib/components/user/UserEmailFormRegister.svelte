<script lang="ts">
  import { resolve } from '$app/paths';
  import UserEmailForm from './UserEmailForm.svelte';

  type Props = {
    onSuccess?: () => void;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { onSuccess, mockSubmit }: Props = $props();
</script>

<UserEmailForm submitLabel="Sign up" {onSuccess} {mockSubmit}>
  {#snippet footer()}
    Already have an account?
    <a href={resolve('/users/login')} class="text-cta hover:underline">Log in</a>.
  {/snippet}
</UserEmailForm>
