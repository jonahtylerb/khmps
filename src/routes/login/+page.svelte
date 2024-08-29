<script>
	import { Heading, Input, Label, Button, Card, A, Alert } from 'flowbite-svelte';

	let { form } = $props();
</script>

<section class="mx-auto flex h-full w-full items-center justify-center">
	<Card>
		<form method="POST" action="?/login" class="space-y-5">
			<Heading tag="h1" class="text-center text-2xl">Login</Heading>
			{#if form?.missing}
				<Alert border class="error"
					><span class="i-tabler-alert-triangle text-xl">.</span> The email and password field is required</Alert
				>
			{/if}
			{#if form?.incorrect}<Alert border class="error"
					><span class="i-tabler-alert-triangle text-xl">.</span> Invalid credentials!</Alert
				>
			{/if}
			<Label>
				<span>Email</span>
				<Input name="email" type="text" placeholder="Email"></Input>
			</Label>
			<Label>
				<span>Password</span>
				<Input name="password" type="password" placeholder="Password"></Input>
			</Label>
			<Button type="submit" class="w-full font-bold">Login</Button>
			<Heading tag="h2" class="font-regular text-center text-xs sm:text-sm"
				>If you don't have an account <A href="/register" class="underline">register here!</A
				></Heading
			>
		</form>
	</Card>
</section>
