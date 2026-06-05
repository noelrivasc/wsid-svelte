<script lang="ts">
  import type { ActionData } from './$types';
  import UserEmailFormLogin from '$lib/components/user/UserEmailFormLogin.svelte';

  let { form }: { form: ActionData } = $props();
</script>

<h1>Log in</h1>

{#if form?.message}
  <p>{form.message}</p>
{:else}
  <UserEmailFormLogin />
{/if}
