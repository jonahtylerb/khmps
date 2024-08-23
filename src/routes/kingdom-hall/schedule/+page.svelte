<script>
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
</script>

<section class="w-full overflow-x-auto">
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
							class="!b-0 absolute inset-1 !bg-transparent p-1"
							type="text"
							bind:value={task.title}
						/>
						{task.title}
					</TableBodyCell>
					<TableBodyCell>
						<Button class="bg-transparent! p-0" onclick={() => (userSearch = '')}
							>{task.assignedTo.name}<span class="i-tabler-chevron-down ml-1 opacity-50"
							></span></Button
						>
						<Dropdown placement="bottom-start" class="h-44 overflow-y-auto px-3 pb-3 text-sm">
							<div slot="header" class="p-3">
								<Search size="md" bind:value={userSearch} />
							</div>
							{#each users as user (user.id)}
								<Radio name={user.id} value={user} bind:group={task.assignedTo}>{user.name}</Radio>
							{/each}
						</Dropdown>
					</TableBodyCell>
					{#each [...Array(12).keys()] as i}
						<TableBodyCell
							tdClass={`p-2 b-x-1 dark:b-gray-7 b-gray-3 text-center text-lg ${task.due.split('-').includes(`${i + 1}`) ? 'bg-green-500/50' : ''}`}
						>
							<button onclick={updateDate}>
								{task.completed?.split('-').includes(`${i + 1}`) ? 'x' : ''}
							</button>
						</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</section>
