<script lang="ts">
	import type { PageProps } from './$types';
	import Decision from '$lib/components/decision/Decision.svelte';

	let { data }: PageProps = $props();

	// Edit/add handlers are stubs for now — wiring forms to the page server
	// actions (updateMetadata, addFactor, editFactor, addScenario, editScenario,
	// deleteFactor, deleteScenario, setValue) is the next step.
	const noop = () => {};
</script>

<Decision
	decision={data.decision}
	onEditMetadata={noop}
	onAddFactor={noop}
	onEditFactor={noop}
	onAddScenario={noop}
	onEditScenario={noop}
/>
