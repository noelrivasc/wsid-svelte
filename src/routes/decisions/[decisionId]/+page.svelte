<script lang="ts">
	import type { PageProps } from './$types';
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import Decision from '$lib/components/decision/Decision.svelte';
	import FormDecisionMetadataEdit from '$lib/components/decision/FormDecisionMetadataEdit.svelte';

	let { data }: PageProps = $props();

	let editMetadataOpen = $state(false);

	const noop = () => {};

	const transitionParams = { x: 320, duration: 200, easing: sineIn };
</script>

<Decision
	decision={data.decision}
	onEditMetadata={() => (editMetadataOpen = true)}
	onAddFactor={noop}
	onEditFactor={noop}
	onAddScenario={noop}
	onEditScenario={noop}
/>

<Drawer
	bind:open={editMetadataOpen}
	placement="right"
	{transitionParams}
	class="w-full max-w-md p-6"
>
	<h2 class="mb-4 text-xl font-semibold text-heading">Edit decision</h2>
	<FormDecisionMetadataEdit
		metadata={data.decision.metadata}
		onCancel={() => (editMetadataOpen = false)}
		onSuccess={() => (editMetadataOpen = false)}
	/>
</Drawer>
