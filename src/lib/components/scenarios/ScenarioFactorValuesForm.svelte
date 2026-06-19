<script lang="ts">
  import { untrack } from 'svelte';
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Label, Range, Button } from 'flowbite-svelte';
  import type { Factor, FactorsList, Scenario, ScenarioFactorValues } from '$lib/schemas';
  import { scoreFromValues } from '$lib/engine';

  type Props = {
    scenario: Scenario;
    factors: FactorsList;
    factorsMap: Record<string, Factor>;
    values?: ScenarioFactorValues[string];
    onCancel: () => void;
    onSuccess?: () => void;
    // mockSubmit intercepts submission, cancels network call, to test actions in Storybook
    mockSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  };
  let { scenario, factors, factorsMap, values, onCancel, onSuccess, mockSubmit }: Props = $props();

  // `untrack` seeds state from `values` once; later prop changes shouldn't overwrite user edits.
  let vals = $state<Record<string, number>>(
    untrack(() => Object.fromEntries(factors.map((f) => [f.id, values?.[f.id] ?? 0])))
  );

  // Live preview uses the same formula as the canonical scorer.
  const total = $derived(scoreFromValues(vals, factorsMap));

  // STORYBOOK SUBMIT MOCK INTERCEPTOR
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

<form
  method="POST"
  action="?/setValues"
  use:enhance={submit}
  class="flex flex-col gap-4"
  novalidate
>
  <input type="hidden" name="scenarioId" value={scenario.id} />

  <p class="text-sm text-body-subtle">
    Move each slider to set the points this scenario gets for a factor. The score is the sum of
    every value multiplied by the factor's weight.
  </p>

  <div class="flex items-baseline justify-between border-b border-c01 pb-2">
    <span class="text-sm font-semibold text-heading uppercase">Score</span>
    <span class="text-lg font-semibold text-accent-green tabular-nums">{total}</span>
  </div>

  {#each factors as factor (factor.id)}
    <Label class="space-y-2">
      <div class="flex items-baseline justify-between">
        <span>
          {factor.title}
          <span class="ml-2 text-xs text-c04 uppercase">(weight {factor.weight})</span>
        </span>
        <span class="text-sm text-body-subtle tabular-nums">
          {vals[factor.id]} / 10 &middot;
          <span class="font-semibold text-body">{vals[factor.id] * factor.weight}</span>
        </span>
      </div>
      <Range name={`value:${factor.id}`} bind:value={vals[factor.id]} min={0} max={10} step={1} />
    </Label>
  {/each}

  <div class="mt-2 flex items-center justify-end gap-2">
    <Button
      type="button"
      outline
      class="border-c03 text-body hover:text-body/90 focus:ring-c01"
      onclick={onCancel}>Cancel</Button
    >
    <Button type="submit" class="bg-cta text-body-inverted hover:bg-cta/90 focus:ring-c01">
      Save
    </Button>
  </div>
</form>
