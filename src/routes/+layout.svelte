<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<Toaster position="top-center" />
<ModeWatcher />

{@render children()}

<!-- <footer class="mx-auto w-full max-w-sm">Test</footer> -->
