<script lang="ts">
	import type { PageData } from './$types';
	import UserConfirmLogin from '$lib/components/user/UserConfirmLogin.svelte';

	let { data }: { data: PageData } = $props();
</script>

<h1>Confirm login</h1>

<UserConfirmLogin token={data.token} />
