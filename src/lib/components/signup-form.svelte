<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { loginSchema, type LoginSchema } from '$lib/types/form-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<Infer<LoginSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, allErrors, enhance } = form;

	/**
	 * Listen for any backend errors and display a toast for any messages
	 */
	allErrors.subscribe((errors) => {
		let backendErrors = errors.filter((x) => x.path === '_errors')?.flatMap((err) => err.messages);
		if (backendErrors.length > 0 && backendErrors[0]) {
			toast.error('Sign up failed', {
				description: backendErrors[0]
			});
		}
	});
</script>

<form method="POST" action="?/signup" class="mx-auto w-full max-w-sm" use:enhance>
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl">Sign up</Card.Title>
			<Card.Description>Sign up an account using your email address</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="email" placeholder="me@example.com">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input type="email" {...props} bind:value={$formData.email} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input type="password" {...props} bind:value={$formData.password} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Button class="w-full">Sign up</Form.Button>

				<Form.Button variant="outline" class="w-full">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
							fill="currentColor"
						/>
					</svg>
					Continue with Google
				</Form.Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline"> Login </a>
			</div>
		</Card.Content>
	</Card.Root>
</form>
