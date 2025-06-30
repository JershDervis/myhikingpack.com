<script lang="ts">
	import SignupForm from '$lib/components/signup-form.svelte';
	import type { PageData } from './$types.js';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<SignupForm {data} />
</div>
