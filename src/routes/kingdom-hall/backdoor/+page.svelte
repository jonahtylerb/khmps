<script lang="ts">
	import { onMount } from 'svelte';
	import type { Task, User } from '$lib/data';

	const { data } = $props();

	const filterTasks = (tasks: Task[], hall: any) => {
		let dueTasks: Task[] = [];
		let overdueTasks: Task[] = [];

		tasks.forEach((task: Task) => {
			if (!task.assignedTo) return;
			if (!task.assignedTo.email) return;
			let due: string[] = [];
			let completed: string[] = [];

			const sort = (a: any, b: any) => {
				return a - b;
			};

			if (task.completed) {
				completed = task.completed.split('-').sort(sort);
			} else {
				completed = [''];
			}

			if (task.due) {
				due = task.due.split('-').sort(sort);
			} else {
				due = [''];
			}

			const curMonth = new Date().getMonth() + 1;

			let stopLoop = false;
			due.forEach((dueDate: string) => {
				if (stopLoop) return;
				if (dueDate === '') return;
				if (+dueDate > curMonth) return;
				if (completed.includes(dueDate)) {
					return;
				}
				if (+dueDate === curMonth) {
					task.due = dueDate;
					stopLoop = true;
					dueTasks.push(task);
					return;
				}
				stopLoop = true;
				task.due = dueDate;
				overdueTasks.push(task);
			});
		});
		dueTasks = [...new Map(dueTasks.map((v) => [v.id, v])).values()];
		overdueTasks = [...new Map(overdueTasks.map((v) => [v.id, v])).values()];
		console.log(hall.name + ' Due Tasks: ' + dueTasks.length);
		console.log(dueTasks);
		console.log(hall.name + ' Overdue Tasks: ' + overdueTasks.length);
		console.log(overdueTasks);

		const admins = data.users
			.filter((user: User) => {
				if (typeof user.kingdomHall !== 'string') {
					return !!user.adminCode && user.kingdomHall!.id === hall.id;
				}
				return false;
			})
			.map((user: User) => user.email);

		return {
			hall: hall.name,
			dueTasks: dueTasks,
			overdueTasks: overdueTasks,
			admins: admins
		};
	};

	const sendEmails = async (tasks: any, e: any) => {
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				hall: tasks.hall,
				overdueTasks: tasks.overdueTasks,
				dueTasks: tasks.dueTasks,
				admins: tasks.admins
			})
		};
		const response = await fetch('/kingdom-hall/backdoor', options);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		e.innerHTML = 'Emails Sent!';
	};

	const startOperation = async () => {
		let tasksNeedingEmails: any[] = [];
		console.log('start');

		tasksNeedingEmails = data.allTasks.map((group) => {
			return filterTasks(group.tasks, group.kingdomHall);
		});

		const btnGroup = document.getElementById('btnGroup');
		btnGroup!.innerHTML = '';
		tasksNeedingEmails.forEach((tasks: any) => {
			if (!tasks.dueTasks.length && !tasks.overdueTasks.length) return;
			const sendEmailBtn = document.createElement('button');
			sendEmailBtn.classList.add('bg-red', 'p-4');
			sendEmailBtn.innerText = `Send ${
				tasks.dueTasks.length + tasks.overdueTasks.length
			} Emails to ${tasks.hall}`;
			sendEmailBtn.id = tasks.hall;
			sendEmailBtn.addEventListener('click', (e) => {
				sendEmails(tasks, e.target);
			});

			btnGroup?.appendChild(sendEmailBtn);
		});
	};

	onMount(() => {
		const getButton = document.getElementById('get');

		getButton?.addEventListener('click', startOperation);
	});
</script>

<section class="max-w-90vw w-400">
	<h1 class="mt-10 text-2xl font-bold">KHMPS</h1>
	<button id="get" class="bg-primary-500 p-4">GET!</button>
	<section id="btnGroup" class="mt-10 flex flex-row flex-wrap gap-10"></section>
</section>
