<script lang="ts">
	import { Button, Card, Heading } from 'flowbite-svelte';

	const confirm = () => {
		const user = window.confirm(
			`To have colored boxes when printing turn on 'print background colors and images' and turn off 'Headers and Footers' settings if your browser supports it.`
		);
		if (user) {
			window.print();
		}
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="/print.css" />
</svelte:head>

<Card class="max-w-150 space-y-3 print:hidden">
	<Heading tag="h1" class="card-title text-primary text-center text-3xl">Print Preview</Heading>
	<p>
		To have colored boxes when printing turn on "print background colors and images" and turn off
		"Headers and Footers" settings if your browser supports it.
	</p>
	<div class="flex flex-row gap-2 pt-5">
		<Button onclick={confirm} class="w-80% font-bold"
			>Print<i-tabler-printer class="ml-1"></i-tabler-printer>
		</Button>
		<Button
			color="alternative"
			href={`/kingdom-hall/${window.location.pathname.split('/')[3]}`}
			class="w-20%">Back</Button
		>
	</div>
</Card>
<main class="text-10px max-w-200 w-full">
	<section class="b-2 b-gray-800/10 print:b-0 bg-white p-10 text-black shadow-lg print:shadow-none">
		<slot></slot>
	</section>
</main>
