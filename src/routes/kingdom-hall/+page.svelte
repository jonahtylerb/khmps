<script lang="ts">
	import { Card, Heading, P } from 'flowbite-svelte';

	let { data } = $props();

	import { tasksStore } from '$lib/data';

	const currentMonth = new Date().getMonth();

	let dueTasks = $state(0);
	let completedTasks = $state(0);
	let overdueTasks = $state(0);

	for (const task of $tasksStore) {
		if (!task.due) {
			dueTasks++;
			break;
		}

		const due = task.due.split('-') || [];

		let completed: string[] = [];
		if (task.completed) {
			completed = task.completed.split('-');
		}

		due.forEach((month: string) => {
			if (completed.filter((n) => n <= month).length) return completedTasks++;
			if (+month < currentMonth) return overdueTasks++;
			dueTasks++;
		});
	}

	const totalTasks = $derived(dueTasks + completedTasks + overdueTasks);
</script>

<div class="mb-10 w-full space-y-5">
	<Heading tag="h1">Dashboard</Heading>
	<div class="flex w-full flex-row py-10 text-sm sm:text-base">
		{#if completedTasks}
			<div
				class="relative whitespace-nowrap"
				style={`width:${(completedTasks * 100) / totalTasks}%`}
			>
				<div
					class="b-2 b-gray-500/30 absolute top--10 mb-2 w-min rounded bg-gray-100 p-1 dark:bg-gray-700"
				>
					Completed: {completedTasks}
				</div>
				<div class="h-20px w-full rounded-l-full bg-green-400"></div>
			</div>
		{/if}
		{#if overdueTasks}
			<div class="relative whitespace-nowrap" style={`width:${(overdueTasks * 100) / totalTasks}%`}>
				<div
					class="b-2 b-gray-500/30 absolute bottom--12 mb-2 w-min -translate-x-1/2 rounded bg-gray-100 p-1 dark:bg-gray-700"
				>
					Overdue: {overdueTasks}
				</div>
				<div class="h-20px w-full bg-red-400"></div>
			</div>
		{/if}
		{#if dueTasks}
			<div class="relative whitespace-nowrap" style={`width:${(dueTasks * 100) / totalTasks}%`}>
				<div
					class="b-2 b-gray-500/30 absolute right-0 top--10 mb-2 w-min rounded bg-gray-100 p-1 dark:bg-gray-700"
				>
					To be completed: {dueTasks}
				</div>
				<div class="h-20px w-full rounded-r-full bg-gray-300 dark:bg-gray-700"></div>
			</div>
		{/if}
	</div>
</div>
<section class="grid w-full grid-cols-1 flex-col gap-4 md:grid-cols-2">
	{#each data.tasks as task}
		<Card class="!max-w-full" href={`/kingdom-hall/schedule#${task.id}`}>
			<Heading class="text-lg font-bold">{task.title}</Heading>
			<P>{task.assignedTo?.name}</P>
		</Card>
	{/each}
</section>
