<script lang="ts">
	import {
		Button,
		Search,
		Dropdown,
		Input,
		Radio,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import Fuse from 'fuse.js';

	type Task = {
		id: string;
		title: string;
		due: string;
		completed: string;
		assignedTo: { id: string; name: string };
	};

	interface Props {
		task: Task;
		users: { id: string; name: string }[];
	}

	let { task, users }: Props = $props();

	// Users Search
	const usersFuse = new Fuse(users, {
		keys: ['name']
	});
	let userSearch = $state('');
	$effect(() => {
		let result = usersFuse.search(userSearch).map((i) => i.item);
		if (result.length === 0) result = users;
		users = result;
	});

	function updateDate(id: string, task: Task) {
		let completed: string[] = [];
		let due: string[] = [];

		if (task.completed) {
			completed = task.completed?.split('-');
		}
		if (task.due) {
			due = task.due?.split('-');
		}

		if (completed.includes(id)) {
			completed = completed.filter((c: (typeof completed)[0]) => c !== id);
			due = due.filter((d: (typeof due)[0]) => d !== id);
		} else if (due.includes(id)) {
			completed = [...completed, id];
		} else {
			due = [...due, id];
		}

		task.due = due.join(due.length > 1 ? '-' : '');
		task.completed = completed.join(completed.length > 1 ? '-' : '');
	}
</script>

<TableBodyRow id={task.id} class="scroll-mt-100px">
	<TableBodyCell tdClass="!text-transparent whitespace-nowrap relative">
		<Input
			placeholder="Title"
			class="!b-0 absolute inset-1 !bg-transparent p-1"
			type="text"
			bind:value={task.title}
		/>
		{task.title}
	</TableBodyCell>
	<TableBodyCell>
		<Button
			class="bg-transparent! b-0! ring-0! p-0"
			color="light"
			onclick={() => {
				userSearch = '';
				document.getElementById('s-' + task.id)?.focus();
			}}>{task.assignedTo.name}<span class="i-tabler-chevron-down ml-1 opacity-50"></span></Button
		>
		<Dropdown
			placement="bottom-start"
			class="h-44 overflow-x-hidden overflow-y-scroll px-3 pb-3 text-sm"
		>
			<div slot="header" class="p-3">
				<Search id={'s-' + task.id} size="md" bind:value={userSearch} />
			</div>
			{#each users as user (user.id)}
				<div animate:flip={{ duration: 100 }}>
					<Radio name={task.id} value={user} bind:group={task.assignedTo}>{user.name}</Radio>
				</div>
			{/each}
			<Button class="mt-5 w-full" size="sm" color="alternative" href="/kingdom-hall/volunteers"
				>Add New User</Button
			>
		</Dropdown>
	</TableBodyCell>
	{#each [...Array(12).keys()] as i}
		<TableBodyCell
			tdClass={`p-2 b-x-1 dark:b-gray-7 relative b-gray-3 text-center text-lg ${task.due.split('-').includes(`${i + 1}`) ? 'bg-green-500/50' : ''}`}
		>
			<button class="absolute inset-0" onclick={() => updateDate(`${i + 1}`, task)}>
				{task.completed?.split('-').includes(`${i + 1}`) ? 'x' : ''}
			</button>
		</TableBodyCell>
	{/each}
</TableBodyRow>
