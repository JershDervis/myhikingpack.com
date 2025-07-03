<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>My Hiking Pack</title>
	<meta name="description" content="My Hiking Pack" />
</svelte:head>

<Toaster position="top-center" />

<ModeWatcher defaultMode="system" />

<ThemeSwitcher />

{@render children()}

<!-- <footer class="mx-auto w-full max-w-sm">Test</footer> -->
