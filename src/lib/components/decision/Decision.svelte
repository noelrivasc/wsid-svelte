<script lang="ts">
	import type { Decision, Factor } from '$lib/schemas';
	import DecisionMetadata from './DecisionMetadata.svelte';
	import FactorsList from '$lib/components/factors/FactorsList.svelte';

	type Props = {
		decision: Decision;
		onEditMetadata: () => void;
		onAddFactor: () => void;
		onEditFactor: (factor: Factor) => void;
	};
	let { decision, onEditMetadata, onAddFactor, onEditFactor }: Props = $props();
</script>

<article class="flex flex-col gap-8">
	<DecisionMetadata metadata={decision.metadata} onEdit={onEditMetadata} />
	<FactorsList factors={decision.factors} onAdd={onAddFactor} onEdit={onEditFactor} />
</article>
