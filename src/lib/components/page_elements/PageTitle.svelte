<script lang="ts">
  type Props = {
    title: string;
  };
  let { title }: Props = $props();
</script>

<h1 class="text-xl text-body md:text-2xl">{title}</h1>
