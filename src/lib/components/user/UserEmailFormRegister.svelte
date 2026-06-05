<script lang="ts">
  import UserEmailForm from './UserEmailForm.svelte';

  type Props = {
    onSuccess?: () => void;
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { onSuccess, mockSubmit }: Props = $props();

  const footerHtml =
    'Already have an account? <a href="/users/login" class="text-cta hover:underline">Log in</a>.';
</script>

<UserEmailForm submitLabel="Sign up" {footerHtml} {onSuccess} {mockSubmit} />
