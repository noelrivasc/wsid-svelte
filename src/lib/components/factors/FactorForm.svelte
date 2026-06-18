<script lang="ts">
  import { untrack } from 'svelte';
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Label, Input, Textarea, Range, Button, Helper } from 'flowbite-svelte';
  import { factorDraftSchema, type Factor } from '$lib/schemas';

  type Props = {
    action: string;
    submitLabel: string;
    initial?: Factor;
    onCancel: () => void;
    onSuccess?: () => void;
    // mockSubmit intercepts submission, cancels network call, to test actions in Storybook
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { action, submitLabel, initial, onCancel, onSuccess, mockSubmit }: Props = $props();

  // CLIENT-SIDE VALIDATION
  // Runs on input blur; provide quick feedback to user

  // `untrack` seeds state from `initial` once;
  // later prop changes shouldn't overwrite user edits.
  let title = $state(untrack(() => initial?.title ?? ''));
  let description = $state(untrack(() => initial?.description ?? ''));
  let weight = $state(untrack(() => initial?.weight ?? 5));

  let titleTouched = $state(false);
  let descriptionTouched = $state(false);

  const candidate = $derived({
    ...(initial?.id ? { id: initial.id } : {}),
    title: title.trim(),
    description: description.trim() === '' ? undefined : description.trim(),
    weight
  });

  const result = $derived(factorDraftSchema.safeParse(candidate));
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

  // STORYBOOK SUBMIT MOCK INTERCEPTOR
  // Allows us to test actions in the context of Storybook
  // but to allow the action to pass through in the app.
  const submit: SubmitFunction = ({ formData, cancel }) => {
    if (mockSubmit) {
      mockSubmit(Object.fromEntries(formData));
      cancel();
      return;
    }
    return async ({ result, update }) => {
      await update();
      if (result.type === 'success') onSuccess?.();
    };
  };
</script>

<form method="POST" {action} use:enhance={submit} class="flex flex-col gap-4" novalidate>
  {#if initial?.id}
    <input type="hidden" name="id" value={initial.id} />
  {/if}

  <Label class="space-y-2">
    <span>Title</span>
    <Input
      type="text"
      name="title"
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
      name="description"
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
      <span class="text-sm font-semibold text-body tabular-nums">{weight} / 10</span>
    </div>
    <Range name="weight" bind:value={weight} min={0} max={10} step={1} />
  </Label>

  <div class="mt-2 flex items-center justify-end gap-2">
    <Button
      type="button"
      outline
      class="border-c03 text-body hover:text-body/90 focus:ring-c01"
      onclick={onCancel}>Cancel</Button
    >
    <Button
      type="submit"
      disabled={!isValid}
      class="bg-cta text-body-inverted hover:bg-cta/90 focus:ring-c01"
    >
      {submitLabel}
    </Button>
  </div>
</form>
