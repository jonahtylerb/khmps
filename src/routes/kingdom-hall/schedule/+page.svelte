<script lang="ts">
	import { flip } from 'svelte/animate';
	import {
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
		Button,
		Search,
		Modal
	} from 'flowbite-svelte';
	import Fuse from 'fuse.js';
	import { addToast } from '$lib/toastStore';
	import Task from './Task.svelte';

	let { data } = $props();

	const clonedTasks = JSON.parse(JSON.stringify(data.tasks));

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	let tasks = $state(data.tasks);
	let users = $state(data.users);

	// Tasks Search
	const tasksFuse = new Fuse(data.tasks, {
		keys: ['title', 'assignedTo.name']
	});
	let taskSearch = $state('');
	$effect(() => {
		let result = tasksFuse.search(taskSearch).map((i) => i.item);
		if (result.length === 0) result = data.tasks;
		tasks = result;
	});

	function addTask() {
		tasks = [
			...tasks,
			{
				id: 't-' + tasks.length,
				title: '',
				assignedTo: {
					name: '',
					id: ''
				},
				due: '',
				completed: ''
			}
		];
	}

	// Delete Tasks
	const deletedTasks: typeof tasks = [];
	let deleteOpen = $state(false);
	function deleteTask(task: (typeof tasks)[0]) {
		deletedTasks.push(task);
		tasks = tasks.filter((t: (typeof tasks)[0]) => t.id !== task.id);
	}

	// Saving Tasks
	let saveDisabled = $state(false);
	async function save() {
		if (saveDisabled) return;
		saveDisabled = true;
		const addedTasks: typeof tasks = [];
		const updatedTasks = tasks.filter((task: (typeof tasks)[0]) => {
			if (task.id?.slice(0, 2) === 't-') {
				task.id = task.id.split('-')[1];
				addedTasks.push(task);
				return false;
			}
			let cur = clonedTasks.find((t: (typeof tasks)[0]) => t.id === task.id);
			if (
				task.title !== cur?.title ||
				task.assignedTo?.id !== cur?.assignedTo?.id ||
				task.due !== cur?.due ||
				task.completed !== cur?.completed
			) {
				return true;
			}
		});

		const response = await fetch('/kingdom-hall/schedule', {
			method: 'POST',
			body: JSON.stringify({
				updatedTasks: updatedTasks,
				deletedTasks: deletedTasks,
				addedTasks: addedTasks,
				kingdomHall: data.user.kingdomHall?.name
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		let serverReply = await response.json();

		// TODO: Error Handling
		if (serverReply.error) {
			console.error(serverReply.error);
		} else {
			addedTasks.length = 0;
			updatedTasks.length = 0;
			deletedTasks.length = 0;

			addToast({ message: 'Saved', color: 'green', icon: 'i-tabler-check', timeout: 3000 });
			saveDisabled = false;
		}
	}
</script>

<section class="w-full">
	<Search class="w-60% mb-5" bind:value={taskSearch}></Search>
	<Table shadow class="relative">
		<TableHead>
			<TableHeadCell>Title</TableHeadCell>
			<TableHeadCell>Assigned To</TableHeadCell>
			{#each months as month}
				<TableHeadCell class="b-x-1 dark:b-gray-6" padding="p-2">{month}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each tasks as task (task.id)}
				<Task {users} {task}></Task>
			{/each}
		</TableBody>
	</Table>

	<Modal title="Delete Tasks" bind:open={deleteOpen} dismissable={false}>
		{#each tasks as task (task.id)}
			<div animate:flip class="mt-0! b-y-1 b-gray-400/25 flex gap-3 py-2">
				<Button onclick={() => deleteTask(task)} color="red" class="px-2 py-2"
					><span class="i-tabler-trash text-lg"></span></Button
				>
				<div class="flex w-full items-center justify-between">
					<span>{task?.title}</span>
					<span>{task?.assignedTo?.name}</span>
				</div>
			</div>
		{/each}
		<svelte:fragment slot="footer">
			<Button onclick={() => (deleteOpen = false)} class="ml-auto px-8">Done</Button>
		</svelte:fragment>
	</Modal>

	<div class="mt-10 flex justify-between gap-5">
		<Button
			disabled={saveDisabled}
			size="xl"
			color="primary"
			class="w-100% font-bold"
			onclick={save}
			>Save
			<span
				class={`${saveDisabled ? 'i-tabler-loader animate-spin' : 'i-tabler-device-floppy'} ml-1 text-lg`}
			></span>
		</Button>
		<Button color="alternative" class="w-30%" href="/kingdom-hall/print/schedule">
			Print
			<span class="i-tabler-printer ml-1"></span>
		</Button>
		<Button color="dark" class="whitespace-nowrap" onclick={addTask}
			>Add Task
			<span class="i-tabler-plus ml-1"></span>
		</Button>
		<Button color="red" class="whitespace-nowrap" onclick={() => (deleteOpen = true)}>
			Delete Task
			<span class="i-tabler-trash ml-1"></span>
		</Button>
	</div>
</section>
