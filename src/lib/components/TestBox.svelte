<script lang="ts">
  import { testBoxPropsSchema, type TestBoxProps } from './TestBox.schema';

  let props: TestBoxProps = $props();

  const result = $derived(testBoxPropsSchema.safeParse(props));
</script>

{#if result.success}
  {@const { color, text } = result.data}
  <div
    class="flex h-32 w-32 items-center justify-center rounded-md p-4 text-ground"
    class:bg-red={color === 'red'}
    class:bg-blue={color === 'blue'}
  >
    {text}
  </div>
{:else}
  <div role="alert" class="border-red text-red rounded-md border bg-c01 p-3 text-sm">
    <strong class="block font-semibold">Invalid TestBox props</strong>
    <ul class="mt-1 list-disc pl-5">
      {#each result.error.issues as issue (issue.path.join('.') + issue.message)}
        <li><code>{issue.path.join('.') || '(root)'}</code>: {issue.message}</li>
      {/each}
    </ul>
  </div>
{/if}
