<script lang="ts">
  import type { ActionData } from './$types';
  import UserEmailFormRegister from '$lib/components/user/UserEmailFormRegister.svelte';
  import PageTitle from '$lib/components/page_elements/PageTitle.svelte';
  import { EnvelopeSolid } from 'flowbite-svelte-icons';

  let { form }: { form: ActionData } = $props();
</script>

<PageTitle title="Create your account" />

{#if form?.message}
  <p class="my-4 text-body-subtle">
    <EnvelopeSolid class="mr-2 inline-block h-5 w-5 text-accent-orange" />{form.message}
  </p>
{:else}
  <UserEmailFormRegister />
{/if}
