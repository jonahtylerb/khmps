<script>
	import { Card, Heading, P } from 'flowbite-svelte';

	let { data } = $props();
</script>

<section class="grid w-full grid-cols-1 flex-col gap-4 md:grid-cols-2">
	{#each data.tasks as task}
		<Card class="!max-w-full" href={`/kingdom-hall/schedule#${task.id}`}>
			<Heading class="text-lg font-bold">{task.title}</Heading>
			<P>{task.assignedTo.name}</P>
		</Card>
	{/each}
</section>
