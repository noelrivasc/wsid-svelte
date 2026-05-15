<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Log in</h1>

{#if form?.message}
	<p>{form.message}</p>
{:else}
	<form method="POST">
		<label>
			Email
			<input type="email" name="email" required autocomplete="email" />
		</label>
		<button type="submit">Send me a login link</button>
	</form>
	<p>No account yet? <a href="/users/register">Sign up</a>.</p>
{/if}
