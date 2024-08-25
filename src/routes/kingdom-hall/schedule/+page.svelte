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
		Search,
		Modal
	} from 'flowbite-svelte';
	import Fuse from 'fuse.js';
	import { addToast } from '$lib/toastStore';

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

	const tasksFuse = new Fuse(data.tasks, {
		keys: ['title', 'assignedTo.name']
	});

	let taskSearch = $state('');

	let tasks = $state(data.tasks);

	$effect(() => {
		let result = tasksFuse.search(taskSearch).map((i) => i.item);
		if (result.length === 0) result = data.tasks;
		tasks = result;
	});

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

	function updateDate(id: string, task: (typeof tasks)[0]) {
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

	const deletedTasks: typeof tasks = [];
	let deleteOpen = $state(false);

	function deleteTask(task: (typeof tasks)[0]) {
		deletedTasks.push(task);
		tasks = tasks.filter((t: (typeof tasks)[0]) => t.id !== task.id);
	}

	let saveDisabled = $state(false);

	async function save() {
		if (saveDisabled) return;
		saveDisabled = true;
		const addedTasks: typeof tasks = [];
		const updatedTasks = tasks.filter((task: (typeof tasks)[0]) => {
			if (task.id?.slice(0, 2) === 't-') {
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

		if (serverReply.error) {
			console.error(serverReply.error);
		} else {
			saveDisabled = false;
			addToast({ message: 'Saved', color: 'green', icon: 'i-tabler-check', timeout: 3000 });
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
