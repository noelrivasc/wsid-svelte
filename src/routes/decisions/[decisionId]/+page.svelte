<script lang="ts">
	import type { PageProps } from './$types';
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import Decision from '$lib/components/decision/Decision.svelte';
	import DecisionMetadataFormEdit from '$lib/components/decision/DecisionMetadataFormEdit.svelte';
	import FactorFormAdd from '$lib/components/factors/FactorFormAdd.svelte';
	import FactorFormEdit from '$lib/components/factors/FactorFormEdit.svelte';
	import FactorFormDelete from '$lib/components/factors/FactorFormDelete.svelte';
	import type { Factor } from '$lib/schemas';

	let { data }: PageProps = $props();

	let editMetadataOpen = $state(false);
	let addFactorOpen = $state(false);
	let editFactorOpen = $state(false);
	let deleteFactorOpen = $state(false);
	let factorBeingEdited = $state<Factor | null>(null);
	let factorBeingDeleted = $state<Factor | null>(null);

	const noop = () => {};

	const transitionParams = { x: 320, duration: 200, easing: sineIn };

	function openEditFactor(factor: Factor) {
		factorBeingEdited = factor;
		editFactorOpen = true;
	}

	function openDeleteFactor(factor: Factor) {
		factorBeingDeleted = factor;
		deleteFactorOpen = true;
	}
</script>

<Decision
	decision={data.decision}
	onEditMetadata={() => (editMetadataOpen = true)}
	onAddFactor={() => (addFactorOpen = true)}
	onEditFactor={openEditFactor}
	onDeleteFactor={openDeleteFactor}
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
	<DecisionMetadataFormEdit
		metadata={data.decision.metadata}
		onCancel={() => (editMetadataOpen = false)}
		onSuccess={() => (editMetadataOpen = false)}
	/>
</Drawer>

<Drawer
	bind:open={addFactorOpen}
	placement="right"
	{transitionParams}
	class="w-full max-w-md p-6"
>
	<h2 class="mb-4 text-xl font-semibold text-heading">Add factor</h2>
	<FactorFormAdd
		onCancel={() => (addFactorOpen = false)}
		onSuccess={() => (addFactorOpen = false)}
	/>
</Drawer>

<Drawer
	bind:open={editFactorOpen}
	placement="right"
	{transitionParams}
	class="w-full max-w-md p-6"
>
	<h2 class="mb-4 text-xl font-semibold text-heading">Edit factor</h2>
	{#if factorBeingEdited}
		<FactorFormEdit
			factor={factorBeingEdited}
			onCancel={() => (editFactorOpen = false)}
			onSuccess={() => (editFactorOpen = false)}
		/>
	{/if}
</Drawer>

<Drawer
	bind:open={deleteFactorOpen}
	placement="right"
	{transitionParams}
	class="w-full max-w-md p-6"
>
	<h2 class="mb-4 text-xl font-semibold text-heading">Delete factor</h2>
	{#if factorBeingDeleted}
		<FactorFormDelete
			factor={factorBeingDeleted}
			onCancel={() => (deleteFactorOpen = false)}
			onSuccess={() => (deleteFactorOpen = false)}
		/>
	{/if}
</Drawer>
