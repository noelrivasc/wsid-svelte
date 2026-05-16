<script lang="ts">
	import type { ActionData } from './$types';
	import UserEmailFormRegister from '$lib/components/user/UserEmailFormRegister.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Create your account</h1>

{#if form?.message}
	<p>{form.message}</p>
{:else}
	<UserEmailFormRegister />
{/if}
