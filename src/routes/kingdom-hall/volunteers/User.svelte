<script lang="ts">
	import { Search, Button, Dropdown, Input, TableBodyCell, Checkbox } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import type { User, Task } from '$lib/data';
	import Fuse from 'fuse.js';
	interface Props {
		user: User;
		tasks: Task[];
	}

	import { tasksStore } from '$lib/data';

	let { user = $bindable() }: Props = $props();

	// Tasks Search
	const tasksFuse = new Fuse($tasksStore, {
		keys: ['title', 'assignedTo.name']
	});

	let tasksSearch = $state('');
	let tasks = $state($tasksStore);
	$effect(() => {
		let result = tasksFuse.search(tasksSearch).map((i) => i.item);
		if (result.length === 0) result = $tasksStore;
		tasks = result;
	});

	function toggleSkill(id: string) {
		if (!user.skills) user.skills = [];

		if (user.skills.includes(id)) {
			user.skills = user.skills.filter((s) => s !== id);
		} else {
			user.skills = [...user.skills, id];
		}
	}
</script>

<TableBodyCell tdClass="!text-transparent whitespace-nowrap relative select-none ">
	<Input
		placeholder="Name"
		class="!b-0 absolute inset-1 !bg-transparent p-1"
		type="text"
		bind:value={user.name}
	/>
	{user.name}
</TableBodyCell>

<TableBodyCell tdClass="!text-transparent whitespace-nowrap relative">
	<Input
		placeholder="Email"
		class="!b-0 absolute inset-1 !bg-transparent p-1"
		type="text"
		bind:value={user.email}
	/>
	{user.email}
</TableBodyCell>
<TableBodyCell tdClass="!text-transparent whitespace-nowrap relative">
	<Input
		placeholder="Phone"
		class="!b-0 absolute inset-1 !bg-transparent p-1"
		type="text"
		bind:value={user.phone}
	/>
	{user.phone}
</TableBodyCell>

<TableBodyCell tdClass="!text-transparent whitespace-nowrap relative">
	<Input
		placeholder="Congregation"
		class="!b-0 absolute inset-1 !bg-transparent p-1"
		type="text"
		bind:value={user.cong}
	/>
	{user.cong}
</TableBodyCell>

<TableBodyCell>
	<Button
		class="bg-transparent! b-0! ring-0! p-0"
		color="light"
		onclick={() => {
			tasksSearch = '';
			document.getElementById('u-' + user.id)?.focus();
		}}>Skils<span class="i-tabler-chevron-down ml-1 opacity-50"></span></Button
	>
	<Dropdown
		placement="bottom-start"
		class="h-44 overflow-x-hidden overflow-y-scroll px-3 pb-3 text-sm"
	>
		<div slot="header" class="p-3">
			<Search id={'s-' + user.id} size="md" bind:value={tasksSearch} />
		</div>
		{#each tasks as task (task.id)}
			<div animate:flip={{ duration: 100 }}>
				<Checkbox
					name={task.id}
					checked={user.skills ? user.skills.includes(task.id) : false}
					onclick={() => toggleSkill(task.id)}
				>
					{task.title}
				</Checkbox>
			</div>
		{/each}
	</Dropdown>
</TableBodyCell>
