<script lang="ts">
	import { flip } from 'svelte/animate';
	import {
		Table,
		TableBody,
		Radio,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		Input,
		TableHeadCell,
		Button,
		Dropdown,
		Search
	} from 'flowbite-svelte';
	import Fuse from 'fuse.js';

	let { data } = $props();

	const clonedTasks = JSON.parse(JSON.stringify(data.tasks));

	let tasks = $state(data.tasks);

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

	const usersFuse = new Fuse(data.users, {
		keys: ['name']
	});

	let userSearch = $state('');

	let users = $state(data.users);

	$effect(() => {
		let result = usersFuse.search(userSearch).map((i) => i.item);
		if (result.length === 0) result = data.users;
		users = result;
	});

	let addId = 0;
	function addTask() {
		tasks = [
			...tasks,
			{
				id: 't-' + addId++,
				title: '',
				assignedTo: {
					name: '',
					id: 'u-' + addId++
				},
				due: '',
				completed: ''
			}
		];
	}

	function updateDate(id: string, task: (typeof tasks)[0]) {
		let completed = task.completed?.split('-') || [];
		let due = task.due?.split('-') || [];

		if (completed.includes(id)) {
			completed = completed.filter((c: (typeof completed)[0]) => c !== id);
			due = due.filter((d: (typeof due)[0]) => d !== id);
		} else if (due.includes(id)) {
			console.log('here');
			completed = [...completed, id];
		} else {
			due = [...due, id];
		}

		task.due = due.join(due.length > 1 ? '-' : '');
		task.completed = completed.join(completed.length > 1 ? '-' : '');
	}

	function save() {
		const newTasks = [];
		const updatedTasks = clonedTasks.filter((task: (typeof tasks)[0]) => {
			if (task.id?.slice(0, 2) === 't-') {
				newTasks.push(task);
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
	}
</script>

<section class="w-full">
	<Table shadow>
		<TableHead>
			<TableHeadCell>Title</TableHeadCell>
			<TableHeadCell>Assigned To</TableHeadCell>
			{#each months as month}
				<TableHeadCell class="b-x-1 dark:b-gray-6" padding="p-2">{month}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each tasks as task}
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
							}}
							>{task.assignedTo.name}<span class="i-tabler-chevron-down ml-1 opacity-50"
							></span></Button
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
									<Radio name={task.id} value={user} bind:group={task.assignedTo}>{user.name}</Radio
									>
								</div>
							{/each}
							<Button
								class="mt-5 w-full"
								size="sm"
								color="alternative"
								href="/kingdom-hall/volunteers">Add New User</Button
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
			{/each}
		</TableBody>
	</Table>
	<div class="flex justify-between gap-5">
		<Button size="xl" class="w-100% mt-10">SAVE</Button>
		<Button color="dark" size="xl" class="w-100% mt-10" onclick={addTask}>Add Task</Button>
	</div>
</section>
