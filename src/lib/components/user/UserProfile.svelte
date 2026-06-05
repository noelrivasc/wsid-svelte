<script lang="ts">
  type Props = {
    email: string;
  };
  let { email }: Props = $props();
</script>

<p>Signed in as <strong>{email}</strong>.</p>
