<script lang="ts">
	import { untrack } from 'svelte';
	import { Label, Input, Textarea, Range, Button, Helper } from 'flowbite-svelte';
	import { factorSchema, type Factor } from '$lib/schemas';

	type Props = {
		initial?: Factor;
		submitLabel: string;
		onSubmit: (factor: Factor) => void;
		onCancel: () => void;
		onDelete?: () => void;
	};
	let { initial, submitLabel, onSubmit, onCancel, onDelete }: Props = $props();

	// `untrack` seeds state from `initial` once; later prop changes shouldn't overwrite user edits.
	let title = $state(untrack(() => initial?.title ?? ''));
	let description = $state(untrack(() => initial?.description ?? ''));
	let weight = $state(untrack(() => initial?.weight ?? 5));

	const candidate = $derived({
		...(initial?.id ? { id: initial.id } : {}),
		title: title.trim(),
		description: description.trim() === '' ? undefined : description.trim(),
		weight
	});

	const result = $derived(factorSchema.safeParse(candidate));
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
			placeholder="e.g. Salary"
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
			placeholder="A short note about this factor."
			rows={3}
			maxlength={200}
		/>
		{#if descriptionTouched && errors.description}
			<Helper color="red">{errors.description}</Helper>
		{/if}
	</Label>

	<Label class="space-y-2">
		<div class="flex items-baseline justify-between">
			<span>Weight</span>
			<span class="text-sm font-semibold tabular-nums text-body">{weight} / 10</span>
		</div>
		<Range bind:value={weight} min={0} max={10} step={1} />
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
