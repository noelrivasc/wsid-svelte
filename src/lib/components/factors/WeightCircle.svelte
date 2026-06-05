<script lang="ts">
  type Props = { weight: number };
  let { weight }: Props = $props();

  const MIN = 24;
  const MAX = 56;
  const diameter = $derived(MIN + ((MAX - MIN) * Math.max(0, Math.min(10, weight))) / 10);
</script>

<span
  class="inline-flex items-center justify-center rounded-full bg-c01 font-semibold text-body tabular-nums"
  style="width: {diameter}px; height: {diameter}px; font-size: {diameter * 0.4}px;"
  aria-label="Weight {weight} of 10"
>
  {weight}
</span>
