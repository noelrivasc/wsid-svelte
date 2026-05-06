<script lang="ts">
	import '../lib/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar />
<main class="mx-auto max-w-5xl px-4 py-8">
	{@render children()}
</main>
