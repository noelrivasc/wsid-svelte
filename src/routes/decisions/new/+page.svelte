<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import DecisionCreateForm from '$lib/components/decision/DecisionCreateForm.svelte';

	const toList = () => goto(resolve('/decisions'));
	// No-op: the addDecision action redirects (303) to the new decision on success,
	// so there is nothing for the client to navigate. onSuccess only fires on a
	// non-redirect success result, which this action never returns.
	const onSuccess = () => {};
</script>

<DecisionCreateForm onCancel={toList} {onSuccess} />
