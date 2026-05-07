<script lang="ts">
	import { untrack } from 'svelte';
	import { Label, Input, Textarea, Button, Helper } from 'flowbite-svelte';
	import { decisionMetadataSchema, type DecisionMetadata } from '$lib/schemas';

	type Props = {
		initial?: DecisionMetadata;
		submitLabel: string;
		onSubmit: (metadata: DecisionMetadata) => void;
		onCancel: () => void;
		onDelete?: () => void;
	};
	let { initial, submitLabel, onSubmit, onCancel, onDelete }: Props = $props();

	// `untrack` seeds state from `initial` once; later prop changes shouldn't overwrite user edits.
	let title = $state(untrack(() => initial?.title ?? ''));
	let description = $state(untrack(() => initial?.description ?? ''));

	const candidate = $derived({
		title: title.trim(),
		description: description.trim()
	});

	const result = $derived(decisionMetadataSchema.safeParse(candidate));
	const isValid = $derived(result.success);

	const errors = $derived.by(() => {
		if (result.success) return {} as Record<string, string>;
		const map: Record<string, string> = {};
		for (const issue of result.error.issues) {
			const key = String(issue.path[0] ?? '');
			if (!map[key]) map[key] = issue.message;
		}
		return map;
	});

	let titleTouched = $state(false);
	let descriptionTouched = $state(false);

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (!result.success) return;
		onSubmit(result.data);
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-4" novalidate>
	<Label class="space-y-2">
		<span>Title</span>
		<Input
			type="text"
			bind:value={title}
			onblur={() => (titleTouched = true)}
			placeholder="e.g. Accept the new job offer"
			maxlength={50}
			required
		/>
		{#if titleTouched && errors.title}
			<Helper class="text-accent-red">{errors.title}</Helper>
		{/if}
	</Label>

	<Label class="space-y-2">
		<span>Description <span class="text-body-subtle">(optional)</span></span>
		<Textarea
			bind:value={description}
			onblur={() => (descriptionTouched = true)}
			placeholder="What's the decision, and what's at stake?"
			rows={6}
			maxlength={5000}
		/>
		{#if descriptionTouched && errors.description}
			<Helper color="red">{errors.description}</Helper>
		{/if}
	</Label>

	<div class="mt-2 flex items-center justify-between gap-2">
		{#if onDelete}
			<Button
        type="button"
        class="bg-red text-body-inverted hover:bg-red/90 focus:ring-c01"
        onclick={onDelete}>Delete</Button>
		{:else}
			<span></span>
		{/if}
		<div class="flex gap-2">
			<Button
        type="button"
        outline
        class="border-c03 text-body hover:text-body/90 focus:ring-c01"
        onclick={onCancel}>Cancel</Button>
			<Button
				type="submit"
				disabled={!isValid}
				class="bg-cta text-body-inverted hover:bg-cta/90 focus:ring-c01"
			>
				{submitLabel}
			</Button>
		</div>
	</div>
</form>
