<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Confirm login</h1>

<form method="POST">
	<input type="hidden" name="token" value={data.token} />
	<p>Click below to complete your login.</p>
	<button type="submit">Log in</button>
</form>
