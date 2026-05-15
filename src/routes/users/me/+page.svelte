<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Your account</h1>

<p>Signed in as <strong>{data.user.email}</strong>.</p>

<form method="POST" action="/users/logout">
	<button type="submit">Log out</button>
</form>
