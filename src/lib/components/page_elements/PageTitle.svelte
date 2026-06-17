<script lang="ts">
  type Props = {
    title: string;
  };
  let { title }: Props = $props();
</script>

<h1 class="text-semibold text-xl text-heading md:text-2xl">{title}</h1>
