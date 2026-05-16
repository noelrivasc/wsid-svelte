<script lang="ts">
	import type { PageData } from './$types';
	import UserProfile from '$lib/components/user/UserProfile.svelte';

	let { data }: { data: PageData } = $props();
</script>

<h1>Your account</h1>

<UserProfile email={data.user.email} />
