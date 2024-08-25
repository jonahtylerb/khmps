<script>
	import { Button, Heading, Input, Label, Select } from 'flowbite-svelte';

	let servingAs = $state('');
</script>

<section class="w-lg max-w-screen gap-5 px-5">
	<Heading tag="h1" class="mb-5">Register</Heading>
	<form class="space-y-5" method="POST" action="/register">
		<div>
			<Label for="name" class="mb-2">Your Name</Label>
			<Input type="text" name="name" id="name" placeholder="Full Name" required />
		</div>
		<div>
			<Label for="address" class="mb-2">Full Kingdom Hall Address</Label>
			<Input
				type="text"
				id="address"
				name="address"
				placeholder="Address City State Zip"
				required
			/>
		</div>
		<div>
			<Label for="email" class="mb-2">Email</Label>
			<Input type="text" id="name" placeholder="email" name="email" required />
		</div>
		<div>
			<Label for="servingAs" class="mb-2">Serving As</Label>
			<Select
				name="servingAs"
				placeholder="Serving As"
				id="servingAs"
				items={[
					{
						value: 'Maintenance Coordinator',
						name: 'Maintenance Coordinator'
					},
					{
						value: 'Operating Committee Chairman',
						name: 'Operating Committee Chairman'
					},
					{
						value: 'Elder',
						name: 'Elder'
					},
					{
						value: 'Servant',
						name: 'Servant'
					}
				]}
				bind:value={servingAs}
			/>
		</div>
		<Button type="submit" class="mt-8! w-full text-base font-bold">Submit</Button>
	</form>
</section>
