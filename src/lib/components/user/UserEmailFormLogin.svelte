<script lang="ts">
	import UserEmailForm from './UserEmailForm.svelte';

	type Props = {
		onSuccess?: () => void;
		mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
	};
	let { onSuccess, mockSubmit }: Props = $props();
</script>

<UserEmailForm
	submitLabel="Send me a login link"
	footerHtml='No account yet? <a href="/users/register" class="text-cta hover:underline">Sign up</a>.'
	{onSuccess}
	{mockSubmit}
/>
