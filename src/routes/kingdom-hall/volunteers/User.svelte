<script lang="ts">
	import {
		Search,
		Button,
		Radio,
		Dropdown,
		Input,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import { flip } from 'svelte/animate';

	type User = {
		id: string;
		name: string;
		email: string;
		phone: string;
		cong: string;
		skills: string;
		password: string;
	};

	interface Props {
		user: User;
		tasks: any[];
	}

	let { user, tasks }: Props = $props();

	let tasksSearch = $state('');
</script>

<TableBodyRow id={user.id} class="scroll-mt-100px">
	<TableBodyCell tdClass="!text-transparent whitespace-nowrap relative">
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
					<Radio name={task.id} value={task} bind:group={task.skills}>{task.title}</Radio>
				</div>
			{/each}
			<Button class="mt-5 w-full" size="sm" color="alternative" href="/kingdom-hall/volunteers"
				>Add New User</Button
			>
		</Dropdown>
	</TableBodyCell>
</TableBodyRow>
