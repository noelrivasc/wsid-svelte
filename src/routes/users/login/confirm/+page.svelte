<script lang="ts">
  import type { PageData } from './$types';
  import UserConfirmLogin from '$lib/components/user/UserConfirmLogin.svelte';
  import PageTitle from '$lib/components/page_elements/PageTitle.svelte';

  let { data }: { data: PageData } = $props();
</script>

<PageTitle title="Log in" />

<UserConfirmLogin token={data.token} />
