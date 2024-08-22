<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		Input,
		TableHeadCell
	} from 'flowbite-svelte';
	let { data } = $props();

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
			{#each data.tasks as task}
				<TableBodyRow id={task.id} class="scroll-mt-100px">
					<TableBodyCell tdClass="!text-transparent whitespace-nowrap relative">
						<Input
							class="!b-0 absolute inset-1 !bg-transparent p-1"
							type="text"
							bind:value={task.title}
						/>
						{task.title}
					</TableBodyCell>
					<TableBodyCell>{task.assignedTo.name}</TableBodyCell>
					{#each [...Array(12).keys()] as i}
						<TableBodyCell
							tdClass={`p-2 b-x-1 dark:b-gray-7 b-gray-3 text-center ${task.due.split('-').includes(`${i + 1}`) ? 'bg-green-500/50' : ''}`}
						>
							{task.completed?.split('-').includes(`${i + 1}`) ? 'x' : ''}</TableBodyCell
						>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</section>
