<script lang="ts">
	import LoginForm from '$lib/components/login-form.svelte';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<LoginForm {data} />
</div>
