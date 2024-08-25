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
	import User from './User.svelte';

	let { data } = $props();

	const clonedUsers = JSON.parse(JSON.stringify(data.users));

	let users = $state(data.users);

	// Users Search
	const usersFuse = new Fuse(data.users, {
		keys: ['name']
	});
	let userSearch = $state('');
	$effect(() => {
		let result = usersFuse.search(userSearch).map((i) => i.item);
		if (result.length === 0) result = data.users;
		users = result;
	});

	function addUser() {
		users = [
			...users,
			{
				id: 'u-' + users.length,
				name: '',
				email: '',
				phone: '',
				cong: '',
				skills: '',
				password: ''
			}
		];
	}

	// Delete Users
	const deletedUsers: typeof users = [];
	let deleteOpen = $state(false);
	function deleteUser(user: (typeof users)[0]) {
		deletedUsers.push(user);
		users = users.filter((u: (typeof users)[0]) => u.id !== user.id);
	}

	// Saving Users
	let saveDisabled = $state(false);
	async function save() {
		if (saveDisabled) return;
		saveDisabled = true;
		const addedUsers: typeof users = [];
		const updatedUsers = users.filter((user: (typeof users)[0]) => {
			if (user.id?.slice(0, 2) === 'u-') {
				user.id = user.id.split('-')[1];
				addedUsers.push(user);
				return false;
			}
			let cur = clonedUsers.find((u: (typeof users)[0]) => u.id === user.id);
			if (
				user.name !== cur?.name ||
				user.email !== cur?.email ||
				user.phone !== cur?.phone ||
				user.cong !== cur?.cong
			) {
				return true;
			}
		});

		const response = await fetch('/kingdom-hall/volunteers', {
			method: 'POST',
			body: JSON.stringify({
				updatedUsers: updatedUsers,
				deletedUsers: deletedUsers,
				addedUsers: addedUsers
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
			addedUsers.length = 0;
			updatedUsers.length = 0;
			deletedUsers.length = 0;

			addToast({ message: 'Saved', color: 'green', icon: 'i-tabler-check', timeout: 3000 });
			saveDisabled = false;
		}
	}
</script>

<section class="w-full">
	<Search class="w-60% mb-5" bind:value={userSearch}></Search>
	<Table shadow class="relative">
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Phone</TableHeadCell>
			<TableHeadCell>Congregation</TableHeadCell>
			<TableHeadCell>Skils</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each users as user (user.id)}
				<User {user} tasks={data.tasks}></User>
			{/each}
		</TableBody>
	</Table>

	<Modal title="Delete Users" bind:open={deleteOpen} dismissable={false}>
		{#each users as user (user.id)}
			<div animate:flip class="mt-0! b-y-1 b-gray-400/25 flex gap-3 py-2">
				<Button onclick={() => deleteUser(user)} color="red" class="px-2 py-2"
					><span class="i-tabler-trash text-lg"></span></Button
				>
				<div class="flex w-full items-center justify-between">
					<span>{user?.name}</span>
					<span>{user?.email}</span>
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
		<Button color="alternative" class="w-30%" href="/kingdom-hall/print/volunteers">
			Print
			<span class="i-tabler-printer ml-1"></span>
		</Button>
		<Button color="dark" class="whitespace-nowrap" onclick={addUser}>
			Add User
			<span class="i-tabler-plus ml-1"></span>
		</Button>
		<Button color="red" class="whitespace-nowrap" onclick={() => (deleteOpen = true)}>
			Delete User
			<span class="i-tabler-trash ml-1"></span>
		</Button>
	</div>
</section>
